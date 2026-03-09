// console.log("Dashboard Is loading...");

const issues = [];
let count = document.getElementById("issue_count");

const priorityBadge = {
  HIGH: "bg-red-50 border border-red-300 text-red-500",
  MEDIUM: "bg-yellow-50 border border-yellow-300 text-yellow-600",
  LOW: "bg-gray-50 border border-gray-300 text-gray-400",
};

const modalPriorityBadge = {
  HIGH: "bg-red-600 border border-red-300 text-white",
  MEDIUM: "bg-yellow-600 border border-yellow-300 text-white",
  LOW: "bg-gray-600 border border-gray-300 text-white",
};

const labelBadge = {
  BUG: {
    style: "bg-red-50 border border-red-300 text-red-500",
    icon: "./assets/BugDroid.png",
  },
  "HELP WANTED": {
    style: "bg-yellow-50 border border-yellow-300 text-yellow-600",
    icon: "./assets/Lifebuoy.png",
  },
  ENHANCEMENT: {
    style: "bg-green-50 border border-green-300 text-green-600",
    icon: "./assets/Sparkle.png",
  },
  DOCUMENTATION: {
    style: "bg-green-50 border border-green-300 text-gray-600",
    icon: "./assets/document.png",
  },
  "GOOD FIRST ISSUE": {
    style: "bg-blue-50 border border-green-300 text-blue-600",
    icon: "./assets/threat-detection.png",
  },
};

const statusColor = {
  open: { circle: "bg-green-500", border: "border-l-green-500" },
  closed: { circle: "bg-purple-500", border: "border-l-purple-500" },
};

function showLoading() {
  document.getElementById("main_section").classList.add("hidden");
  document.getElementById("loading-spinner").classList.remove("hidden");
}

function hideLoading() {
  document.getElementById("loading-spinner").classList.add("hidden");
  document.getElementById("main_section").classList.remove("hidden");
}

function renderCards(list) {
  count.innerText = list.length;
  const grid = document.getElementById("issuesGrid");

  if (!list.length) {
    grid.innerHTML = `<p class="text-sm text-gray-400 col-span-4 text-center py-10">No issues found.</p>`;
    return;
  }

  grid.innerHTML = list
    .map((issue) => {
      const sc = statusColor[issue.status] || statusColor["open"];

      const labels = issue.labels
        .map((l) => {
          const key = l.toUpperCase();
          // console.log(key);
          const badge = labelBadge[key] || {
            style: "border border-gray-300 text-gray-500",
            icon: "",
          };

          const icon = badge.icon
            ? `<img src="${badge.icon}" class="w-3 h-3 inline-block" alt="${l}"/>`
            : "";

          return `<span class="text-[10px] font-medium px-1.5 py-0.5 rounded-full inline-flex items-center uppercase gap-1 ${badge.style}">
    ${icon} ${l}
  </span>`;
        })
        .join("");

      return `
  <div onclick="openIssueModal(${issue.id})" class="bg-white border border-gray-200 border-t-4 ${sc.border.replace("border-l", "border-t")} rounded-xl p-4 flex flex-col gap-3 cursor-pointer hover:shadow-md transition">
    
    <div class="flex items-center justify-between">
      ${
        issue.priority === "low"
          ? `<img src="./assets/Status_p.png" class="w-8 h-8" alt="status"/>`
          : `<img src="./assets/Status.png" class="w-8 h-8" alt="status"/>`
      }
      <span class="text-xs font-bold px-3 py-1 rounded-full uppercase ${priorityBadge[issue.priority.toUpperCase()] || ""}">${issue.priority}</span>
    </div>

    <p class="text-sm font-bold text-gray-900 capitalize leading-snug cursor-pointer hover:text-indigo-600 transition" >${issue.title}</p>

    <p class="text-xs text-gray-400 leading-snug line-clamp-2">${issue.description}</p>

    <div class="flex flex-wrap gap-1">${labels}</div>

    <div class="border-t border-gray-100"></div>

    <div class="text-xs text-gray-400 flex flex-col gap-1">
      <p><span class="text-gray-500">#${issue.id}</span> by <span class="text-gray-600 font-medium">${issue.author}</span></p>
      <p>${issue.createdAt}</p>
    </div>

  </div>
`;
    })
    .join("");
}

function setupTabs() {
  document.querySelectorAll("button").forEach((btn) => {
    const text = btn.textContent.trim();
    if (text === "All") {
      btn.dataset.filter = "all";
      btn.classList.add("tab-btn");
    }
    if (text === "Open") {
      btn.dataset.filter = "open";
      btn.classList.add("tab-btn");
    }
    if (text === "Closed") {
      btn.dataset.filter = "closed";
      btn.classList.add("tab-btn");
    }
  });

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((b) => {
        b.className =
          "px-4 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 rounded-sm tab-btn";
      });
      btn.className =
        "px-4 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-sm tab-btn";

      const filter = btn.dataset.filter;
      renderCards(
        filter === "all" ? issues : issues.filter((i) => i.status === filter),
      );
    });
  });
}

async function setupSearch() {
  document
    .getElementById("searchBtn")
    .addEventListener("click", async function () {
      const searchValue = document.getElementById("searchInput").value.trim();

      if (searchValue === "") {
        renderCards(issues);
        return;
      }

      try {
        showLoading();
        const res = await fetch(
          `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`,
        );
        const data = await res.json();
        hideLoading();
        renderCards(data.data);
      } catch (err) {
        hideLoading();
        console.error("Search failed:", err);
      }
    });
  document
    .getElementById("searchInput")
    .addEventListener("input", function (e) {
      if (e.target.value === "") {
        renderCards(issues);
      }
    });
}

async function openIssueModal(id) {
  document.getElementById("issueModal").classList.remove("hidden");
  document.getElementById("modalContent").innerHTML = `
    <div class="flex justify-center py-8">
      <span class="loading loading-spinner loading-md text-indigo-600"></span>
    </div>
  `;

  try {
    const res = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
    );
    const data = await res.json();
    const issue = data.data;
    const sc = statusColor[issue.status] || statusColor["open"];
    const modalStatus =
      issue.status === "open"
        ? "bg-green-600 text-white"
        : "bg-purple-600 text-white";

    const labels = issue.labels
      .map((l) => {
        const key = l.toUpperCase();
        // console.log(key);
        const badge = labelBadge[key] || {
          style: "border border-gray-300 text-gray-500",
          icon: "",
        };

        const icon = badge.icon
          ? `<img src="${badge.icon}" class="w-3 h-3 inline-block" alt="${l}"/>`
          : "";

        return `<span class="text-[10px] font-medium px-1.5 py-0.5 rounded-full inline-flex items-center uppercase gap-1 ${badge.style}">
    ${icon} ${l}
  </span>`;
      })
      .join("");

    document.getElementById("modalContent").innerHTML = `
  <h2 class="text-xl font-bold text-gray-900 mb-3">${issue.title}</h2>

  <!-- Status + Author + Date -->
  <div class="flex items-center gap-2 flex-wrap mb-4">
   <span class="flex items-center gap-1 ${modalStatus} text-sm px-2.5 py-1 rounded-full">
 
  ${issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
</span>
    <span class="text-xs text-gray-400">• Opened by <span class="text-gray-600 font-medium">${issue.author}</span></span>
    <span class="text-xs text-gray-400">• ${new Date(issue.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}</span>
  </div>

  <div class="flex flex-wrap gap-2 mb-4">${labels}</div>
  <p class="text-sm text-gray-600 mb-5 leading-relaxed">${issue.description}</p>

  <div class="flex items-center gap-4 bg-gray-50 rounded-lg p-4 mb-5">
    <div class="flex-1">
      <p class="text-xs text-gray-400 mb-1">Assignee:</p>
      <p class="text-sm font-semibold text-gray-800">${issue.assignee || "Unassigned"}</p>
    </div>
    <div>
      <p class="text-xs text-gray-400 mb-1">Priority:</p>
      <span class="text-xs font-bold px-3 py-1 rounded-full ${modalPriorityBadge[issue.priority.toUpperCase()] || ""}">${issue.priority.toUpperCase()}</span>
    </div>
  </div>
  <div class="flex justify-end">
    <button id="closeModal" class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition">
      Close
    </button>
  </div>
`;
    document.getElementById("closeModal").addEventListener("click", () => {
      document.getElementById("issueModal").classList.add("hidden");
    });
  } catch (err) {
    document.getElementById("modalContent").innerHTML = `
      <p class="text-sm text-red-500 text-center py-8">Failed to load issue details.</p>
    `;
  }
}

function setupModal() {
  document.getElementById("issueModal").addEventListener("click", function (e) {
    if (e.target === this) {
      this.classList.add("hidden");
    }
  });
}

async function loadIssues() {
  showLoading();

  try {
    const res = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );
    const data = await res.json();
    hideLoading();

    issues.push(...data.data);
    renderCards(issues);

    setupTabs();
    setupSearch();
    setupModal();
  } catch (err) {
    hideLoading();
    document.getElementById("issuesGrid").innerHTML =
      `<p class="text-sm text-red-500 col-span-4 text-center py-10">Failed to load issues. Please try again.</p>`;
  }
}

document.addEventListener("DOMContentLoaded", loadIssues);
