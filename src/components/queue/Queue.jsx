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

const getUserRoleFromLocalStorage = () => {
  // Replace 'userRole' with the actual key used to store role in local storage
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.role : null;
};

const Queue = () => {
  const [projects, setProjects] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [selectedVisualization, setSelectedVisualization] = useState('table');
  const [userRole, setUserRole] = useState(null); // State to store user role
  const timelineRef = useRef(null);

  useEffect(() => {
    setProjects(dummyProjects); // Replace with actual data fetching logic
    const role = getUserRoleFromLocalStorage();
    setUserRole(role);
  }, []);

  useEffect(() => {
    if (selectedVisualization === 'timeline' && timelineRef.current) {
      const items = new DataSet(projects.map((project, index) => ({
        id: index,
        content: `<div class="timeline-item">
                    <div class="timeline-item-title">${project.client.fullName}</div>
                    <div class="timeline-item-details">
                      <div>Client: ${project.client.fullName}</div>
                      <div>Owner: ${project.owner}</div>
                      <div>Type: ${project.type}</div>
                      <div>Start: ${project.expectedStartDate.substr(0, 10)}</div>
                      <div>End: ${project.expectedCompletionDate.substr(0, 10)}</div>
                    </div>
                  </div>`,
        start: project.expectedStartDate,
        end: project.expectedCompletionDate,
        style: `background-color: ${index % 2 === 0 ? 'rgba(255, 193, 7, 0.8)' : 'rgba(3, 169, 244, 0.8)'}; border-color: ${index % 2 === 0 ? '#FFC107' : '#03A9F4'};`
      })));

      const options = {
        width: '100%',
        height: '300px',
        margin: {
          item: 20
        },
        stack: false,
        showCurrentTime: true,
        start: new Date(),
        end: new Date(new Date().setDate(new Date().getDate() + 14)),
        zoomMin: 1000 * 60 * 60 * 24, // One day in milliseconds
        zoomMax: 1000 * 60 * 60 * 24 * 31 * 12, // One year in milliseconds
        format: {
          minorLabels: {
            day: 'D'
          },
          majorLabels: {
            day: 'MMMM YYYY'
          }
        },
        timeAxis: {
          scale: 'day',
        }
      };

      new Timeline(timelineRef.current, items, options);
    }
  }, [selectedVisualization, projects]);

  const handleVisualizationChange = (e) => {
    setSelectedVisualization(e.target.value);
  };

  const renderTable = () => (
    <DataTable value={projects} paginator first={first} rows={rows} currentPageReportTemplate="{totalRecords} مشروع">
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
  );

  const renderTimeline = () => (
    <div ref={timelineRef} style={{ width: '100%', height: '300px' }}></div>
  );

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
