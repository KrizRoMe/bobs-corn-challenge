# 🌽 Bobs Corn Challenge

Bobs Corn Challenge is a technical test designed to demonstrate my skills as a software engineer.

## 🌍 Live Demo

🚀 **Deployed at:** [http://ec2-35-173-125-150.compute-1.amazonaws.com](http://ec2-35-173-125-150.compute-1.amazonaws.com)

> The application is deployed on AWS EC2 using Docker and Nginx as a reverse proxy.

## 🛠️ Requirements

- [Bun v1.2.19](https://bun.sh/blog/bun-v1.2.19)

## 🚀 Getting Started

1. Clone the repository.

   ```bash
   git clone https://github.com/KrizRoMe/bobs-corn-challenge
   cd rentesy
   ```

2. Install dependencies.

   ```bash
   make install
   ```

> [!TIP]
> If `make` is not recognized as a command, see the **Environment Setup** section below to install and configure it properly.

3. Set up git hooks:

   ```bash
   make prepare
   ```

4. Set up environment variables:

   - Copy the content of `.env.example` into `.env` and `.env.local`:

   ```bash
   cp .env.example .env
   cp .env.example .env.local
   ```

   - Fill in the values of the environment variables.

> [!IMPORTANT]
> Make sure your `.env` and `.env.local` files contain valid credentials and database URLs before running migrations.

5. Set up database:

   - Create a database using compose.yml:

   ```bash
   make up-dev
   ```

   - Run the migrations:

   ```bash
   make migrate-dev
   ```

   - Seed the database:

   ```bash
   make seed
   ```

> [!TIP]
> If you encounter connection errors, verify that Docker is running and your `.env` database credentials match those defined in `compose.dev.yaml`.

6. Start the development server and navigate to <http://127.0.0.1:3000/> to access the application.

   ```bash
   make dev
   ```

---

## ⚙️ Environment Setup

1. **Install Volta**

Download the [Volta installer](https://docs.volta.sh/guide/getting-started#install-volta) and run it.

> [!TIP]
> After installing Volta, restart your terminal so that the `volta` command is recognized.

2. **Install Bun (v1.2.19)**

   ```bash
   volta install bun@1.2.19
   bun --version
   ```

3. **Install and configure Make**

#### 🐧 Linux

```bash
sudo apt-get install make
```

#### 🏁 macOS

```bash
brew install make
```

#### 🪟 Windows

Install [Chocolatey](https://chocolatey.org/install) and run the following command:

```bash
choco install make
```

> [!TIP]
> Ensure your terminal (PowerShell, Git Bash, or WSL) includes make in your PATH.
> You can check it by running:

```bash
make --version
```

## 🧪 Running Tests

This project includes a complete test suite to ensure code quality and functionality.
You can run the tests using **Make commands**.

### 1. Run all tests

```bash
make test
```

### 2. Run tests in watch mode

```bash
make test-watch
```

### 3. Run E2E tests

```bash
make test-e2e
```

---
