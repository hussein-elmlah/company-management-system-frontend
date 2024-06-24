import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Timeline, DataSet } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.min.css';
import './Queue.css';
import { fetchProjectsWithParams } from '../../store/slices/projectSlice';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../components/pagination/Pagination'; // Ensure the correct import path

const Queue = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [selectedVisualization, setSelectedVisualization] = useState('table');
  const [userRole, setUserRole] = useState(null); 
  const [timelineStart, setTimelineStart] = useState(new Date().toISOString().split('T')[0]);
  const [timelineEnd, setTimelineEnd] = useState(new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString().split('T')[0]);
  const timelineRef = useRef(null);

  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projectList);
  const isLoading = useSelector((state) => state.projects.loading);
  const error = useSelector((state) => state.projects.error);
  const currentPage = useSelector((state) => state.projects.currentPage);
  const totalPages = useSelector((state) => state.projects.totalPages);
  const [pageNumber, setPageNumber] = useState(currentPage);
  const projectsPerPage = 10;

  useEffect(() => {
    console.log('component did mounted');
  }, []);

  useEffect(() => {
    console.log('useEffect');
    handlePageChange(pageNumber);
  }, [dispatch, pageNumber, timelineStart, timelineEnd]);
  
  useEffect(() => {
    console.log('configuring Visualization');
    configureVisualization();
    setSelectedVisualization(selectedVisualization);
  }, [selectedVisualization, projects]);

  const handlePageChange = (page) => {
    console.log('Handling page change to:', page);
    setPageNumber(page);
    dispatch(fetchProjectsWithParams({ page, limit: projectsPerPage, timeline_start: timelineStart, timeline_end: timelineEnd }));
  };

  const configureVisualization = () => {
    if (selectedVisualization === 'timeline' && timelineRef.current) {
      console.log('Configuring timeline visualization');
      let visualizationProjects = JSON.parse(JSON.stringify(projects)).filter(project => project.expectedStartDate && project.expectedCompletionDate);
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

  const handleTimelineStartChange = (e) => {
    console.log('Changing timelineStart to:', e.target.value);
    setTimelineStart(e.target.value);
  };

  const handleTimelineEndChange = (e) => {
    console.log('Changing timelineEnd to:', e.target.value);
    setTimelineEnd(e.target.value);
  };

  const renderTable = () => (
    <div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">اسم العميل</th>
            <th scope="col">المالك</th>
            <th scope="col">نوع المشروع</th>
            <th scope="col">تاريخ التقديم</th>
            <th scope="col">تاريخ البدء</th>
            <th scope="col">تاريخ الانتهاء المتوقع</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td>{project.client.fullName}</td>
              <td>{project.owner}</td>
              <td>{project.type}</td>
              <td>{new Date(project.dateOfSubmission).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
              <td>{new Date(project.expectedStartDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
              <td>{new Date(project.expectedCompletionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
      <div className="card p-3">
        <div className="mb-3 row px-5">
            <label className='col-md-3 text-center'>Timeline Start:</label>
            <input className='col-md-3 text-center' type="date" value={timelineStart} onChange={handleTimelineStartChange} />
            <label className='col-md-3 text-center'>Timeline End:</label>
            <input className='col-md-3 text-center' type="date" value={timelineEnd} onChange={handleTimelineEndChange} />
        </div>
        <div>
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
    </div>
  );
};

export default Queue;
