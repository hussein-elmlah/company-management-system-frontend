const dummyProjects = [
  {
    client: {
      fullName: "Alice Williams",
      mobileNumber: "111-222-3333",
    },
    owner: "6678fc7abfc449d72170614e", // Valid ObjectId of User
    sender: "60f81fe877905e15f08f6f48",
    dateOfSubmission: new Date("2024-04-05T10:15:00.000Z"),
    expectedStartDate: new Date("2024-06-30T00:00:00.000Z"),
    type: "Residential",
    participatingDepartments: [
      "65f024ca7447e7f5d0285cc8", // Valid ObjectId of Department
      "65f024ca7447e7f5d0285cc9", // Valid ObjectId of Department
    ],
    numberOfFloors: 2,
    landArea: 700,
    buildingArea: 350,
    totalBuildingArea: 700,
    annex: {
      upper: true,
      land: true,
    },
    hoursExpectedToComplete: 120,
    expectedCompletionDate: new Date("2024-07-03T15:59:59.999Z"),
    actualCompletionDate: null,
    projectPictures: [
      "https://source.unsplash.com/800x300/?villa",
      "https://source.unsplash.com/800x300/?kitchen",
      "https://source.unsplash.com/800x300/?bedroom",
    ],
    description:
      "This is a residential project with two floors and an upper land annex. Expected to complete in 120 hours.",
  },
  {
    client: {
      fullName: "Eva Davis",
      mobileNumber: "444-555-6666",
    },
    owner: "6678fc7abfc449d72170614e", // Valid ObjectId of User
    sender: "60f81fe877905e15f08f6f49",
    dateOfSubmission: new Date("2024-05-15T14:00:00.000Z"),
    expectedStartDate: new Date("2024-07-04T00:00:00.000Z"),
    type: "Commercial",
    participatingDepartments: [
      "65f024ca7447e7f5d0285cc8", // Valid ObjectId of Department
      "65f024ca7447e7f5d0285cca", // Valid ObjectId of Department
    ],
    numberOfFloors: 4,
    landArea: 1200,
    buildingArea: 600,
    totalBuildingArea: 2400,
    annex: {
      upper: true,
      land: false,
    },
    hoursExpectedToComplete: 180,
    expectedCompletionDate: new Date("2024-07-06T23:59:59.999Z"),
    actualCompletionDate: null,
    projectPictures: [
      "https://source.unsplash.com/800x300/?villa",
      "https://source.unsplash.com/800x300/?kitchen",
      "https://source.unsplash.com/800x300/?bedroom",
    ],
    description:
      "This is a commercial project with four floors and an upper annex. Expected to complete in 180 hours.",
  },
  {
    client: {
      fullName: "Charlie Brown",
      mobileNumber: "777-888-9999",
    },
    owner: "6678fc7abfc449d72170614e", // Valid ObjectId of User
    sender: "60f81fe877905e15f08f6f4a",
    dateOfSubmission: new Date("2024-06-20T18:30:00.000Z"),
    expectedStartDate: new Date("2024-07-08T00:00:00.000Z"),
    type: "Residential",
    participatingDepartments: [
      "65f024ca7447e7f5d0285cca", // Valid ObjectId of Department
      "65f024ca7447e7f5d0285ccb", // Valid ObjectId of Department
    ],
    numberOfFloors: 3,
    landArea: 900,
    buildingArea: 450,
    totalBuildingArea: 1350,
    annex: {
      upper: true,
      land: true,
    },
    hoursExpectedToComplete: 140,
    expectedCompletionDate: new Date("2024-07-12T23:59:59.999Z"),
    actualCompletionDate: null,
    projectPictures: [
      "https://source.unsplash.com/800x300/?villa",
      "https://source.unsplash.com/800x300/?kitchen",
      "https://source.unsplash.com/800x300/?office",
    ],
    description:
      "This is a residential project with three floors and an upper land annex. Expected to complete in 140 hours.",
  },
  {
    client: {
      fullName: "Grace Turner",
      mobileNumber: "123-987-4567",
    },
    owner: "6678fc7abfc449d72170614e", // Valid ObjectId of User
    sender: "60f81fe877905e15f08f6f4b",
    dateOfSubmission: new Date("2024-07-01T08:45:00.000Z"),
    expectedStartDate: new Date("2024-07-11T00:00:00.000Z"),
    type: "Commercial",
    participatingDepartments: [
      "65f024ca7447e7f5d0285cc9", // Valid ObjectId of Department
      "65f024ca7447e7f5d0285cca", // Valid ObjectId of Department
    ],
    numberOfFloors: 5,
    landArea: 1500,
    buildingArea: 750,
    totalBuildingArea: 3750,
    annex: {
      upper: false,
      land: false,
    },
    hoursExpectedToComplete: 200,
    expectedCompletionDate: new Date("2024-07-18T23:59:59.999Z"),
    actualCompletionDate: null,
    projectPictures: [
      "https://source.unsplash.com/800x300/?nature",
      "https://source.unsplash.com/800x300/?kitchen",
      "https://source.unsplash.com/800x300/?bedroom",
    ],
    description:
      "This is a commercial project with five floors. Expected to complete in 200 hours.",
  },
];

export default dummyProjects;
