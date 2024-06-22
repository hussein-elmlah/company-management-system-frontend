import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './Queue.css';
import dummyProjects from './dummyProjects/dummyProjects';
const Queue = () => {
  const [projects, setProjects] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

  useEffect(() => {
    setProjects(dummyProjects);
  }, []);

  // const fetchProjectsData = async () => {
  //   try {
  //     const response = await // here i will use axios to fetch the project data
  //     const data = await response.json();
  //     setProjects(data);
  //   } catch (error) {
  //     console.error('Error fetching projects data:', error);
  //   }
  // };

  return (
    <div className="queue container mt-3">
      <div className="card">
        <DataTable value={projects} paginator first={first} rows={rows} currentPageReportTemplate="{totalRecords} مشروع">
          <Column field="client.fullName" header="اسم العميل" sortable style={{ width: '15%' }}></Column>
          <Column field="owner" header="المالك" sortable style={{ width: '10%' }}></Column>
          <Column field="type" header="نوع المشروع" sortable style={{ width: '10%' }}></Column>
          <Column field="dateOfSubmission" header="تاريخ التقديم" sortable style={{ width: '15%' }}
            body={(rowData) => new Date(rowData.dateOfSubmission).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}>
          </Column>
          <Column field="expectedCompletionDate" header="تاريخ الانتهاء المتوقع" sortable style={{ width: '15%' }}
            body={(rowData) => new Date(rowData.expectedCompletionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}>
          </Column>
        </DataTable>
      </div>
    </div>
  );
};

export default Queue;
