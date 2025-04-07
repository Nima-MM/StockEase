# 🙌 Contributing to StockEase

**Thank you** for your interest in contributing to StockEase! Your help makes this project better for everyone.

---

## 📚 Table of Contents

- [🚀 Getting Started](#-getting-started)
- [🛠️ Project Structure](#️-project-structure)
- [💻 Development Setup](#-development-setup)
- [🌿 Branching Strategy](#-branching-strategy)
- [📌 Commit Guidelines](#-commit-guidelines)
- [🔀 Pull Request Process](#-pull-request-process)
- [🐞 Reporting Issues](#-reporting-issues)
- [🧹 Coding Standards](#-coding-standards)
- [📑 License](#-license)

---

## 🚀 Getting Started

We use JHipster (April 2025 release) as our project scaffold.

**Stack Overview:**
- **Frontend:** Vue.js (Composition API) with TypeScript & PrimeVue
- **Backend:** Spring Boot (Java)
- **Database:** PostgreSQL
- **Containerization:** Docker Compose

---

## 🛠️ Project Structure

```bash
stockease
├── frontend (Vue.js, PrimeVue, TypeScript)
├── backend (Java Spring Boot)
├── docker-compose
├── tests (Unit & Integration tests)
└── docs (Documentation)
```

---

## 💻 Development Setup

Follow these steps to set up StockEase locally:

**Prerequisites:**
- [JDK 17](https://adoptium.net/)
- [Node.js LTS](https://nodejs.org/en)
- [Docker](https://docs.docker.com/compose/install/)

### Clone and setup

```bash
git clone https://github.com/YOUR-USERNAME/stockease.git
cd stockease
```
Install further dependencies:
```bash
npm install
```

### Start the application

Run the application using Docker:
Backend:
```bash
npm run java:docker
```
```bash
npm run app:start
```
Frontend:
```bash
npm run start
```

Frontend accessible at: [http://localhost:9000](http://localhost:9000)

Backend accessible at: [http://localhost:8080/api](http://localhost:8080/api)

---

## 🌿 Branching Strategy

We follow a simple Git workflow:

- **main**: Stable production release
- **develop**: Ongoing development branch
- **feature/<name>**: Individual features
- **bugfix/<name>**: Bug fixes and patches

Always branch off from `develop` and merge back into `develop`.

---

## 📌 Commit Guidelines

Write clear, concise commit messages:

```bash
feat(backend): add user authentication

- Implement JWT-based authentication
- Add unit tests for AuthController
```

Use conventional commit prefixes:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `chore:` - Maintenance tasks
- `test:` - Adding or improving tests

---

## 🔀 Pull Request Process

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-awesome-feature`
3. Commit changes following guidelines
4. Push your branch: `git push origin feature/my-awesome-feature`
5. Open a clear and descriptive PR against `develop`

We'll review your PR promptly!

---

## 🐞 Reporting Issues

Use our [Issue Templates](./.github/ISSUE_TEMPLATE/) to report bugs or suggest improvements.

Please provide clear steps to reproduce and screenshots if possible.

---

## 🧹 Coding Standards

Maintain high-quality code:

- Follow the official [Vue.js Style Guide](https://vuejs.org/style-guide/) (Composition API).
- Adhere to [Spring Boot best practices](https://spring.io/guides).
- Keep frontend responsive and accessible.
- Include unit and integration tests.

---

## 📑 License

StockEase is licensed under the MIT license. See [LICENSE](LICENSE) for details.

---

🎉 **Thank you for contributing to StockEase!** Let's build something amazing together.

