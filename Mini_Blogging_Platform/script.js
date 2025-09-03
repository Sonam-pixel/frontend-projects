let posts = JSON.parse(localStorage.getItem("posts")) || [];
let editIndex = null;

// Render posts
function renderPosts(filteredPosts = posts) {
  const postContainer = document.getElementById("posts");
  postContainer.innerHTML = "";

  if (filteredPosts.length === 0) {
    postContainer.innerHTML = "<p>No posts found. Start writing!</p>";
    return;
  }

  filteredPosts.forEach((post, index) => {
    postContainer.innerHTML += `
      <article class="post">
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <div class="actions">
          <button class="edit-btn" onclick="editPost(${index})">✏️ Edit</button>
          <button class="delete-btn" onclick="deletePost(${index})">🗑️ Delete</button>
        </div>
      </article>
    `;
  });
}

// Add or update post
function addPost() {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (title && content) {
    if (editIndex !== null) {
      // Update existing post
      posts[editIndex] = { title, content };
      editIndex = null;
    } else {
      // Add new post at the top
      posts.unshift({ title, content });
    }

    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();

    // Clear inputs
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
  } else {
    alert("Please fill out both fields!");
  }
}

// Edit post
function editPost(index) {
  document.getElementById("title").value = posts[index].title;
  document.getElementById("content").value = posts[index].content;
  editIndex = index;

  // Scroll back to form for editing
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Delete post
function deletePost(index) {
  if (confirm("Are you sure you want to delete this post?")) {
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
  }
}

// Search posts
function searchPosts() {
  const query = document.getElementById("search").value.toLowerCase();
  const filtered = posts.filter(
    post =>
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query)
  );
  renderPosts(filtered);
}

// Dark mode toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const toggleBtn = document.getElementById("themeToggle");
  toggleBtn.textContent = document.body.classList.contains("dark")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});

// Load posts on page load
renderPosts();
