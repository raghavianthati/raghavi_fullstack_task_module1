$(document).ready(function () {

    // ==========================================
    // AI SDLC DATA
    // ==========================================

    const defaultStages = [

        {
            id: 1,
            name: "Planning",
            icon: "bi-clipboard-data",
            description:
                "Define the project goals, scope, resources, timeline and expected AI solution.",

            activities: [
                "Define project objectives",
                "Identify stakeholders",
                "Prepare project timeline",
                "Estimate resources and cost"
            ],

            aiTasks: [
                "Identify AI use case",
                "Define expected AI output",
                "Select suitable AI approach"
            ],

            status: "Pending",
            progress: 0
        },


        {
            id: 2,
            name: "Requirement Analysis",
            icon: "bi-file-earmark-text",
            description:
                "Collect and analyze functional and technical requirements for the AI system.",

            activities: [
                "Identify user requirements",
                "Define system requirements",
                "Identify hardware and software needs",
                "Prepare requirement document"
            ],

            aiTasks: [
                "Define AI model requirements",
                "Identify input and output data",
                "Define accuracy requirements"
            ],

            status: "Pending",
            progress: 0
        },


        {
            id: 3,
            name: "Data Collection",
            icon: "bi-database",
            description:
                "Collect relevant and reliable data required for training and evaluating the AI model.",

            activities: [
                "Identify data sources",
                "Collect datasets",
                "Store collected data",
                "Check data quality"
            ],

            aiTasks: [
                "Collect training data",
                "Collect validation data",
                "Collect testing data"
            ],

            status: "Pending",
            progress: 0
        },


        {
            id: 4,
            name: "Data Preprocessing",
            icon: "bi-funnel",
            description:
                "Clean, transform and prepare raw data before using it for AI model development.",

            activities: [
                "Remove duplicate data",
                "Handle missing values",
                "Normalize data",
                "Split dataset"
            ],

            aiTasks: [
                "Feature engineering",
                "Data normalization",
                "Data labeling",
                "Training and testing split"
            ],

            status: "Pending",
            progress: 0
        },


        {
            id: 5,
            name: "AI Model Development",
            icon: "bi-cpu",
            description:
                "Design, train and optimize an artificial intelligence or machine learning model.",

            activities: [
                "Select algorithm",
                "Build model",
                "Train model",
                "Tune model parameters"
            ],

            aiTasks: [
                "Select ML/DL algorithm",
                "Train AI model",
                "Optimize hyperparameters",
                "Save trained model"
            ],

            status: "Pending",
            progress: 0
        },


        {
            id: 6,
            name: "Testing & Evaluation",
            icon: "bi-shield-check",
            description:
                "Test the AI model and evaluate its performance, reliability and accuracy.",

            activities: [
                "Perform functional testing",
                "Perform integration testing",
                "Check system performance",
                "Fix identified issues"
            ],

            aiTasks: [
                "Evaluate model accuracy",
                "Calculate precision and recall",
                "Check model errors",
                "Test unseen data"
            ],

            status: "Pending",
            progress: 0
        },


        {
            id: 7,
            name: "Deployment",
            icon: "bi-cloud-upload",
            description:
                "Deploy the tested AI system so that users can access and use the solution.",

            activities: [
                "Prepare production environment",
                "Deploy application",
                "Configure database",
                "Configure cloud services"
            ],

            aiTasks: [
                "Deploy AI model",
                "Create prediction API",
                "Connect model with application",
                "Monitor predictions"
            ],

            status: "Pending",
            progress: 0
        },


        {
            id: 8,
            name: "Maintenance",
            icon: "bi-tools",
            description:
                "Continuously monitor, update and improve the AI system after deployment.",

            activities: [
                "Monitor application",
                "Fix bugs",
                "Update software",
                "Collect user feedback"
            ],

            aiTasks: [
                "Monitor model performance",
                "Detect model drift",
                "Retrain model",
                "Update AI model"
            ],

            status: "Pending",
            progress: 0
        }

    ];


    // ==========================================
    // LOCAL STORAGE
    // ==========================================

    const storageKey = "aiSDLCProject";

    let stages = JSON.parse(localStorage.getItem(storageKey));

    if (!stages) {

        stages = defaultStages;

        localStorage.setItem(
            storageKey,
            JSON.stringify(stages)
        );

    }


    // ==========================================
    // DISPLAY STAGES
    // ==========================================

    function displayStages() {

        const container = $("#stageContainer");

        container.empty();

        const searchText =
            $("#searchStage").val().toLowerCase();

        const filterStatus =
            $("#statusFilter").val();


        let filteredStages = stages.filter(function (stage) {

            const matchesSearch =
                stage.name.toLowerCase().includes(searchText);

            const matchesStatus =
                filterStatus === "All" ||
                stage.status === filterStatus;

            return matchesSearch && matchesStatus;

        });


        if (filteredStages.length === 0) {

            container.html(`
                <div class="col-12">
                    <div class="alert alert-warning text-center">
                        <i class="bi bi-search"></i>
                        No SDLC stage found.
                    </div>
                </div>
            `);

            return;
        }


        filteredStages.forEach(function (stage) {

            let statusClass = "";

            if (stage.status === "Completed") {
                statusClass = "text-success";
            }
            else if (stage.status === "In Progress") {
                statusClass = "text-warning";
            }
            else {
                statusClass = "text-danger";
            }


            const card = `

                <div class="col-md-6 col-lg-4">

                    <div class="stage-card">

                        <div class="d-flex align-items-center gap-3 mb-3">

                            <div class="stage-number">
                                ${stage.id}
                            </div>

                            <div>

                                <div class="stage-title">
                                    <i class="bi ${stage.icon}"></i>
                                    ${stage.name}
                                </div>

                            </div>

                        </div>


                        <p class="stage-description">
                            ${stage.description}
                        </p>


                        <div class="mb-3">

                            <label class="form-label fw-bold">
                                Status
                            </label>

                            <select
                                class="form-select status-select stage-status"
                                data-id="${stage.id}">

                                <option value="Pending"
                                    ${stage.status === "Pending" ? "selected" : ""}>
                                    Pending
                                </option>

                                <option value="In Progress"
                                    ${stage.status === "In Progress" ? "selected" : ""}>
                                    In Progress
                                </option>

                                <option value="Completed"
                                    ${stage.status === "Completed" ? "selected" : ""}>
                                    Completed
                                </option>

                            </select>

                        </div>


                        <div class="mb-3">

                            <div class="d-flex justify-content-between">

                                <small class="fw-bold">
                                    Progress
                                </small>

                                <small class="${statusClass}">
                                    ${stage.progress}%
                                </small>

                            </div>


                            <div class="progress stage-progress mt-2">

                                <div
                                    class="progress-bar"
                                    style="width:${stage.progress}%">
                                </div>

                            </div>

                        </div>


                        <button
                            class="btn btn-outline-primary details-btn view-details"
                            data-id="${stage.id}">

                            <i class="bi bi-eye"></i>
                            View Details

                        </button>

                    </div>

                </div>
            `;


            container.append(card);

        });

    }


    // ==========================================
    // UPDATE PROGRESS BASED ON STATUS
    // ==========================================

    function getProgress(status) {

        if (status === "Completed") {
            return 100;
        }

        if (status === "In Progress") {
            return 50;
        }

        return 0;
    }


    // ==========================================
    // UPDATE DASHBOARD
    // ==========================================

    function updateDashboard() {

        const total = stages.length;

        let completed = 0;
        let inProgress = 0;
        let pending = 0;

        let totalProgress = 0;


        stages.forEach(function (stage) {

            if (stage.status === "Completed") {
                completed++;
            }
            else if (stage.status === "In Progress") {
                inProgress++;
            }
            else {
                pending++;
            }

            totalProgress += stage.progress;

        });


        const overall =
            Math.round(totalProgress / total);


        $("#totalStages").text(total);

        $("#completedStages").text(completed);

        $("#progressStages").text(inProgress);

        $("#pendingStages").text(pending);


        $("#overallPercentage").text(
            overall + "%"
        );


        $("#overallProgress")
            .css("width", overall + "%");


        localStorage.setItem(
            storageKey,
            JSON.stringify(stages)
        );

    }


    // ==========================================
    // CHANGE STATUS
    // ==========================================

    $(document).on(
        "change",
        ".stage-status",
        function () {

            const id =
                parseInt($(this).data("id"));

            const newStatus =
                $(this).val();


            stages.forEach(function (stage) {

                if (stage.id === id) {

                    stage.status = newStatus;

                    stage.progress =
                        getProgress(newStatus);

                }

            });


            updateDashboard();

            displayStages();

        }
    );


    // ==========================================
    // VIEW DETAILS
    // ==========================================

    $(document).on(
        "click",
        ".view-details",
        function () {

            const id =
                parseInt($(this).data("id"));


            const stage =
                stages.find(function (item) {

                    return item.id === id;

                });


            $("#modalTitle").html(
                `<i class="bi ${stage.icon}"></i>
                 ${stage.name}`
            );


            $("#modalDescription")
                .text(stage.description);


            $("#modalActivities").empty();

            stage.activities.forEach(function (activity) {

                $("#modalActivities").append(
                    `<li>${activity}</li>`
                );

            });


            $("#modalAITasks").empty();

            stage.aiTasks.forEach(function (task) {

                $("#modalAITasks").append(
                    `<li>${task}</li>`
                );

            });


            const modal =
                new bootstrap.Modal(
                    document.getElementById("stageModal")
                );

            modal.show();

        }
    );


    // ==========================================
    // SEARCH
    // ==========================================

    $("#searchStage").on(
        "keyup",
        function () {

            displayStages();

        }
    );


    // ==========================================
    // FILTER
    // ==========================================

    $("#statusFilter").on(
        "change",
        function () {

            displayStages();

        }
    );


    // ==========================================
    // RESET PROJECT
    // ==========================================

    $("#resetProject").click(function () {

        const confirmReset =
            confirm(
                "Are you sure you want to reset the entire AI SDLC project?"
            );


        if (confirmReset) {

            stages =
                JSON.parse(
                    JSON.stringify(defaultStages)
                );


            localStorage.setItem(
                storageKey,
                JSON.stringify(stages)
            );


            $("#searchStage").val("");

            $("#statusFilter").val("All");


            displayStages();

            updateDashboard();

            alert(
                "AI SDLC project has been reset successfully."
            );

        }

    });


    // ==========================================
    // INITIAL LOAD
    // ==========================================

    displayStages();

    updateDashboard();

});