import React, { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Timeline, DataSet } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";
import "./Queue.css";
import { fetchProjectsWithParams } from "../../store/slices/projectSlice";
import { getAllDepartments } from "../../axios/departments";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/pagination/Pagination";

const Queue = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [selectedVisualization, setSelectedVisualization] = useState("table");
  const [userRole, setUserRole] = useState(null);
  const [timelineStart, setTimelineStart] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [timelineEnd, setTimelineEnd] = useState(
    new Date(new Date().setMonth(new Date().getMonth() + 2))
      .toISOString()
      .split("T")[0]
  );
  const [isAnyTime, setIsAnyTime] = useState(false);
  const [typeFilter, setTypeFilter] = useState("");
  const [programFilter, setProgramFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [departments, setDepartments] = useState([]);
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
    getAllDepartments().then(setDepartments).catch(console.error);
  }, []);

  useEffect(() => {
    console.log("component did mounted");
  }, []);

  useEffect(() => {
    console.log("useEffect");
    handlePageChange(pageNumber);
  }, [
    dispatch,
    pageNumber,
    timelineStart,
    timelineEnd,
    isAnyTime,
    typeFilter,
    programFilter,
    departmentFilter,
  ]);

  useEffect(() => {
    console.log("configuring Visualization");
    configureVisualization();
    setSelectedVisualization(selectedVisualization);
  }, [selectedVisualization, projects]);

  const handlePageChange = (page) => {
    console.log("Handling page change to:", page);
    setPageNumber(page);
    const params = {
      page,
      limit: projectsPerPage,
      ...(isAnyTime
        ? {}
        : { timeline_start: timelineStart, timeline_end: timelineEnd }),
      ...(typeFilter && { type: typeFilter }),
      ...(programFilter && { program: programFilter }),
      ...(departmentFilter && { department: departmentFilter }),
    };
    dispatch(fetchProjectsWithParams(params));
  };

  const configureVisualization = () => {
    if (selectedVisualization === "timeline" && timelineRef.current) {
      console.log("Configuring timeline visualization");
      let visualizationProjects = JSON.parse(JSON.stringify(projects)).filter(
        (project) => project.expectedStartDate && project.expectedCompletionDate
      );
      console.log("visualizationProjects: ", visualizationProjects);
      const items = new DataSet(
        visualizationProjects.map((project, index) => ({
          id: index,
          content: `<div class="timeline-item">
                    <div class="timeline-item-title">${
                      project.client.fullName
                    }</div>
                    <div class="timeline-item-details">
                      <div>Client: ${project.client.fullName}</div>
                      <div>Owner: ${project.owner}</div>
                      <div>Type: ${project.type}</div>
                      <div>Start: ${project.expectedStartDate
                        ?.toString()
                        .substr(0, 10)}</div>
                      <div>End: ${project.expectedCompletionDate
                        ?.toString()
                        .substr(0, 10)}</div>
                    </div>
                  </div>`,
          start: project.expectedStartDate,
          end: project.expectedCompletionDate,
          style: `background-color: ${
            index % 2 === 0
              ? "rgba(255, 193, 7, 0.8)"
              : "rgba(3, 169, 244, 0.8)"
          }; border-color: ${index % 2 === 0 ? "#FFC107" : "#03A9F4"};`,
        }))
      );

      const options = {
        width: "100%",
        height: "300px",
        margin: { item: 20 },
        stack: false,
        showCurrentTime: true,
        start: new Date(),
        end: new Date(new Date().setDate(new Date().getDate() + 14)),
        zoomMin: 1000 * 60 * 60 * 24,
        zoomMax: 1000 * 60 * 60 * 24 * 31 * 12,
        format: {
          minorLabels: { day: "D" },
          majorLabels: { day: "MMMM YYYY" },
        },
        timeAxis: { scale: "day" },
      };

      new Timeline(timelineRef.current, items, options);
    }
  };

  const handleVisualizationChange = (e) => {
    console.log("Changing visualization to:", e.target.value);
    setSelectedVisualization(e.target.value);
    if (e.target.value === "timeline") {
      setIsAnyTime(false);
    }
  };

  const handleTimelineStartChange = (e) => {
    console.log("Changing timelineStart to:", e.target.value);
    setTimelineStart(e.target.value);
  };

  const handleTimelineEndChange = (e) => {
    console.log("Changing timelineEnd to:", e.target.value);
    setTimelineEnd(e.target.value);
  };

  const handleAnyTimeChange = (e) => {
    setIsAnyTime(e.target.checked);
  };

  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
  };

  const handleProgramFilterChange = (e) => {
    setProgramFilter(e.target.value);
  };

  const handleDepartmentFilterChange = (e) => {
    setDepartmentFilter(e.target.value);
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
              <td>
                {new Date(project.dateOfSubmission).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "short", day: "numeric" }
                )}
              </td>
              <td>
                {new Date(project.expectedStartDate).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "short", day: "numeric" }
                )}
              </td>
              <td>
                {new Date(project.expectedCompletionDate).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "short", day: "numeric" }
                )}
              </td>
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
    const visElements = document.querySelectorAll(".vis-timeline");
    if (visElements.length > 1) {
      for (let i = 0; i < visElements.length - 1; i++) {
        visElements[i].parentNode.removeChild(visElements[i]);
      }
    }
  };

  const renderTimeline = () => {
    removeOldVisualizations();
    return (
      <div ref={timelineRef} style={{ width: "100%", height: "300px" }}></div>
    );
  };

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
        <div>
          <div className="px-1">
            <div className="text-center border-bottom">
              <select
                className="mb-3 px-5 rounded border-1 p-1 form-select"
                onChange={handleVisualizationChange}
                value={selectedVisualization}
              >
                <option value="timeline">Timeline</option>
                <option value="table">Table</option>
                {userRole === "branchManager" && (
                  <option value="chart">Chart</option>
                )}
              </select>
            </div>
            <div className="mb-1 py-2 border-bottom">
              <div>
                <input
                  type="checkbox"
                  checked={isAnyTime}
                  onChange={handleAnyTimeChange}
                  disabled={selectedVisualization === "timeline"}
                />
                <span className="ps-1 pe-3">Any Time</span>
                <label className="me-1">Timeline Start:</label>
                <input
                  className="me-4 rounded border-1 p-1"
                  type="date"
                  value={timelineStart}
                  onChange={handleTimelineStartChange}
                  disabled={isAnyTime}
                />
                <label className="me-1">Timeline End:</label>
                <input
                  className="me-4 rounded border-1 p-1"
                  type="date"
                  value={timelineEnd}
                  onChange={handleTimelineEndChange}
                  disabled={isAnyTime}
                />
              </div>
            </div>
            <div className="mb-3 py-2 border-bottom">
              <label className="me-1">Department:</label>
              <select
                className="me-4 rounded border-1 p-1"
                value={departmentFilter}
                onChange={handleDepartmentFilterChange}
              >
                <option value="">All</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>

              <label className="me-1">Program:</label>
              <select
                className="me-4 rounded border-1 p-1"
                value={programFilter}
                onChange={handleProgramFilterChange}
              >
                <option value="">All</option>
                <option value="autocad">autocad</option>
                <option value="revit">revit</option>
              </select>

              <label className="me-1">Project Type:</label>
              <select
                value={typeFilter}
                onChange={handleTypeFilterChange}
                className="me-4 rounded border-1 p-1"
              >
                <option value="">All</option>
                <option value="villa">villa</option>
                <option value="residential">residential</option>
                <option value="commercial">commercial</option>
                <option value="administrative">administrative</option>
              </select>
            </div>
          </div>
          <div>
            {selectedVisualization === "table" && renderTable()}
            {selectedVisualization === "timeline" && renderTimeline()}
            {selectedVisualization === "chart" &&
              userRole === "branchManager" &&
              renderChart()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queue;
