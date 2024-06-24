import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Timeline, DataSet } from 'vis-timeline/standalone';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'vis-timeline/styles/vis-timeline-graph2d.min.css';
import './Queue.css';
import dummyProjects from './dummyProjects/dummyProjects';
import { fetchProjectsWithParams } from '../../store/slices/projectSlice';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../components/pagination/Pagination'; // Ensure the correct import path

const getUserRoleFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.role : null;
};

const Queue = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [selectedVisualization, setSelectedVisualization] = useState('table');
  const [userRole, setUserRole] = useState(null); 
  const timelineRef = useRef(null);

  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projectList);
  const isLoading = useSelector((state) => state.projects.loading);
  const error = useSelector((state) => state.projects.error);
  const currentPage = useSelector((state) => state.projects.currentPage);
  const totalPages = useSelector((state) => state.projects.totalPages);
  const [pageNumber, setPageNumber] = useState(currentPage);
  const projectsPerPage = 6;

  useEffect(() => {
    const role = getUserRoleFromLocalStorage();
    setUserRole(role);
    console.log('User role:', role);
  }, []);

  useEffect(() => {
    console.log('handlePageChange with page:', pageNumber);
    handlePageChange(pageNumber);
  }, [dispatch, pageNumber]);
  
  useEffect(() => {
    console.log('configuring Visualization');
    configureVisualization();
  }, [selectedVisualization]);

  const handlePageChange = (page) => {
    console.log('Handling page change to:', page);
    setPageNumber(page);
    dispatch(fetchProjectsWithParams({ page: page, limit: projectsPerPage }));
  };

  const configureVisualization = () => {
    if (selectedVisualization === 'timeline' && timelineRef.current) {
      console.log('Configuring timeline visualization');
      console.log("projects: ", projects);
      console.log("dummyProjects: ", dummyProjects);
      let visualizationProjects = JSON.parse(JSON.stringify(projects)).filter(project => project.expectedStartDate && project.expectedCompletionDate);
      visualizationProjects = visualizationProjects.concat(dummyProjects);
      console.log("visualizationProjects: ", visualizationProjects);
      const items = new DataSet(visualizationProjects.map((project, index) => ({
        id: index,
        content: `<div class="timeline-item">
                    <div class="timeline-item-title">${project.client.fullName}</div>
                    <div class="timeline-item-details">
                      <div>Client: ${project.client.fullName}</div>
                      <div>Owner: ${project.owner}</div>
                      <div>Type: ${project.type}</div>
                      <div>Start: ${project.expectedStartDate?.toString().substr(0, 10)}</div>
                      <div>End: ${project.expectedCompletionDate?.toString().substr(0, 10)}</div>
                    </div>
                  </div>`,
        start: project.expectedStartDate,
        end: project.expectedCompletionDate,
        style: `background-color: ${index % 2 === 0 ? 'rgba(255, 193, 7, 0.8)' : 'rgba(3, 169, 244, 0.8)'}; border-color: ${index % 2 === 0 ? '#FFC107' : '#03A9F4'};`
      })));
  
      const options = {
        width: '100%',
        height: '300px',
        margin: { item: 20 },
        stack: false,
        showCurrentTime: true,
        start: new Date(),
        end: new Date(new Date().setDate(new Date().getDate() + 14)),
        zoomMin: 1000 * 60 * 60 * 24, 
        zoomMax: 1000 * 60 * 60 * 24 * 31 * 12,
        format: {
          minorLabels: { day: 'D' },
          majorLabels: { day: 'MMMM YYYY' }
        },
        timeAxis: { scale: 'day' }
      };
  
      new Timeline(timelineRef.current, items, options);
    }
  };
  

  const handleVisualizationChange = (e) => {
    console.log('Changing visualization to:', e.target.value);
    setSelectedVisualization(e.target.value);
  };

  const renderTable = () => (
    <div>
      <DataTable value={projects}>
        <Column field="client.fullName" header="اسم العميل" sortable style={{ width: '15%' }}></Column>
        <Column field="owner" header="المالك" sortable style={{ width: '10%' }}></Column>
        <Column field="type" header="نوع المشروع" sortable style={{ width: '10%' }}></Column>
        <Column field="dateOfSubmission" header="تاريخ التقديم" sortable style={{ width: '15%' }}
          body={(rowData) => new Date(rowData.dateOfSubmission).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}>
        </Column>
        <Column field="expectedStartDate" header="تاريخ البدء" sortable style={{ width: '15%' }}
          body={(rowData) => new Date(rowData.expectedStartDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}>
        </Column>
        <Column field="expectedCompletionDate" header="تاريخ الانتهاء المتوقع" sortable style={{ width: '15%' }}
          body={(rowData) => new Date(rowData.expectedCompletionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}>
        </Column>
      </DataTable>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );



  const removeOldVisualizations = () => {
      const visElements = document.querySelectorAll('.vis-timeline');
      if (visElements.length > 1) {
        for (let i = 0; i < visElements.length - 1; i++) {
          visElements[i].parentNode.removeChild(visElements[i]);
        }
      }
  }

  const renderTimeline = () => {
    removeOldVisualizations();

    return (
      <div ref={timelineRef} style={{ width: '100%', height: '300px' }}></div>
    );
  }

  const renderChart = () => (
    <LineChart width={600} height={300} data={projects}>
      <Line type="monotone" dataKey="landArea" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="client.fullName" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );

  return (
    <div className="queue container mt-3">
      <div className="card">
        <select className='form-select mb-3' onChange={handleVisualizationChange} value={selectedVisualization}>
          <option value="timeline">Timeline</option>
          <option value="table">Table</option>
          {userRole === 'branchManager' && <option value="chart">Chart</option>}
        </select>
        {selectedVisualization === 'timeline' && renderTimeline()}
        {selectedVisualization === 'table' && renderTable()}
        {selectedVisualization === 'chart' && renderChart()}
      </div>
    </div>
  );
};

export default Queue;
