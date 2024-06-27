import React, { useState, useEffect, useRef } from "react";
import { Timeline, DataSet } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";
import "./Queue.css";
import { fetchProjectsWithParams } from "../../store/slices/projectSlice";
import { getAllDepartments } from "../../axios/departments";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/pagination/Pagination";
import { debounce } from "../../utilities/debounce";
import { QueueSpinner } from "../reusables/LoadingSpinner";
import { FaTasks } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



const Queue = () => {
  const navigate = useNavigate();

  function handleAssign (projectId) {
    navigate(`/projects/${projectId}/assign`)
  };

  const [selectedVisualization, setSelectedVisualization] = useState("table");
  const [timelineStart, setTimelineStart] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [timelineEnd, setTimelineEnd] = useState(
    new Date(new Date().setMonth(new Date().getMonth() + 2))
      .toISOString()
      .split("T")[0]
  );
  const [isAnyTime, setIsAnyTime] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [programFilter, setProgramFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [departments, setDepartments] = useState([]);
  const timelineRef = useRef(null);

  const [searchWord, setSearchWord] = useState("");
  const [searchField, setSearchField] = useState("name");

  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projectList);
  let isLoading = useSelector((state) => state.projects.loading);
  const error = useSelector((state) => state.projects.error);
  const currentPage = useSelector((state) => state.projects.currentPage);
  const totalPages = useSelector((state) => state.projects.totalPages);
  const [pageNumber, setPageNumber] = useState(currentPage);
  const projectsPerPage = 5;
  let limit = projectsPerPage;

  useEffect(() => {
    getAllDepartments().then(setDepartments).catch(console.error);
  }, []);

  useEffect(() => {
    handlePageChange(pageNumber);
  }, [
    dispatch,
    pageNumber,
    timelineStart,
    timelineEnd,
    isAnyTime,
    statusFilter,
    typeFilter,
    programFilter,
    departmentFilter,
    searchField,
  ]);

  useEffect(() => {
    if (selectedVisualization === "table") {
      limit = projectsPerPage;
    } else limit = 101;
    if(selectedVisualization === "timeline") {
      setStatusFilter("accepted");
    }
    handlePageChange(pageNumber);
  }, [selectedVisualization]);

  useEffect(() => {
    configureVisualization();
    setSelectedVisualization(selectedVisualization);
  }, [projects]);

  const handlePageChange = (page) => {
    setPageNumber(page);
    const params = {
      page,
      limit,
      ...(isAnyTime
        ? {}
        : { timeline_start: timelineStart, timeline_end: timelineEnd }),
      ...(statusFilter && { projectStatus: statusFilter }),
      ...(typeFilter && { type: typeFilter }),
      ...(programFilter && { program: programFilter }),
      ...(departmentFilter && { department: departmentFilter }),
      ...(searchWord && searchField && { [searchField]: searchWord }),
    };
    dispatch(fetchProjectsWithParams(params));
  };

  const handleVisualizationChange = (e) => {
    setSelectedVisualization(e.target.value);
    if (e.target.value === "timeline") {
      setIsAnyTime(false);
    }
  };

  const handleTimelineStartChange = (e) => {
    setTimelineStart(e.target.value);
  };

  const handleTimelineEndChange = (e) => {
    setTimelineEnd(e.target.value);
  };

  const handleAnyTimeChange = (e) => {
    setIsAnyTime(e.target.checked);
  };

  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
  };
  
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleProgramFilterChange = (e) => {
    setProgramFilter(e.target.value);
  };

  const handleDepartmentFilterChange = (e) => {
    setDepartmentFilter(e.target.value);
  };

  const handleSearchChange = (value) => {
    setSearchWord(value);
    debounceDispatch(value);
  };

  const debounceDispatch = useRef(
    debounce((value) => {
      const params = {
        page: pageNumber,
        limit,
        ...(isAnyTime
          ? {}
          : { timeline_start: timelineStart, timeline_end: timelineEnd }),
        ...(statusFilter && { projectStatus: statusFilter }),
        ...(typeFilter && { type: typeFilter }),
        ...(programFilter && { program: programFilter }),
        ...(departmentFilter && { department: departmentFilter }),
        ...(searchField && { [searchField]: value }),
      };
      dispatch(fetchProjectsWithParams(params));
    }, 500)
  ).current;

  const configureVisualization = () => {
    if (selectedVisualization === "timeline" && timelineRef.current) {
      let visualizationProjects = JSON.parse(JSON.stringify(projects)).filter(
        (project) => project.expectedStartDate && project.expectedCompletionDate
      );
      const items = new DataSet(
        visualizationProjects.map((project, index) => ({
          id: index,
          content: `<div class="timeline-item">
                    <div class="timeline-item-title">
                      project: ${project.name}
                    </div>
                    <div class="timeline-item-details">
                      <div>Client: ${project.client?.fullName}</div>
                      <div>Owner: ${project.owner?.fullName}</div>
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

  const renderTable = () => (
    <div>
      {isLoading && <QueueSpinner isLoading={isLoading} />}
      {!isLoading && (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">project name</th>
              <th scope="col">status</th>
              <th scope="col">location</th>
              <th scope="col">client name</th>
              <th scope="col">client number</th>
              <th scope="col">owner</th>
              <th scope="col">project type</th>
              <th scope="col">expected Start Date</th>
              <th scope="col">expected Completion Date</th>
              <th scope="col">Assign</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <td>{project.name}</td>
                <td>{project.projectStatus}</td>
                <td>{project.location}</td>
                <td>{project.client?.fullName}</td>
                <td>{project.client?.mobileNumber}</td>
                <td>{project.owner?.fullName}</td>
                <td>{project.type}</td>
                <td>
                  {new Date(project.expectedStartDate).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "short", day: "numeric" }
                  )}
                </td>
                <td>
                  {new Date(project.expectedCompletionDate).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </td>
                <td>
                  <button className="btn btn-link text-danger" onClick={() => handleAssign(project.id)}>
                    <FaTasks />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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
      <div>
        {isLoading && <QueueSpinner isLoading={isLoading} />}
        {!isLoading && (
          <div>
            {projects.length > 100 && (
              <div className="alert alert-warning" role="alert">
                There are more than 100 projects. <br/>Only 100 projects can be displayed. <br/>Please change filters for better results.
              </div>
            )}
            <div
              ref={timelineRef}
              style={{ width: "100%", height: "300px" }}
            ></div>
          </div>
        )}
      </div>
    );
  };  

  return (
    <div className="queue container my-3">
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
              </select>
            </div>
            <div>
              <div className="mb-3 py-2 border-bottom">
                <label className="me-1">Search By:</label>
                <select
                  className="me-4 rounded border-1 p-1"
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                >
                  <option value="name">Name</option>
                  <option value="location">Location</option>
                  <option value="client.fullName">Client</option>
                  <option value="owner.fullName">Owner</option>
                </select>
                <input
                  type="text"
                  value={searchWord}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search..."
                  className="me-4 rounded border-1 p-1"
                />
              </div>
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

              <label className="me-1">Type:</label>
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

              <label className="me-1">Status:</label>
              <select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                className="me-4 rounded border-1 p-1"
                disabled={selectedVisualization === "timeline"}
              >
                <option value="">All</option>
                <option value="accepted">accepted</option>
                <option value="pending">pending</option>
                <option value="rejected">rejected</option>
              </select>

            </div>
          </div>
          <div>
            {selectedVisualization === "table" && renderTable()}
            {selectedVisualization === "timeline" && renderTimeline()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queue;
