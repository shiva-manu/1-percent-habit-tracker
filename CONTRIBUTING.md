# Contributing to 1% Habit Tracker

First off, thank you for considering contributing to 1% Habit Tracker! It's people like you that make this project such a great tool for habit building.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:
- Be respectful and inclusive
- Exercise consideration and empathy
- Focus on what is best for the community
- Use welcoming and inclusive language

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed**
- **Explain the behavior you expected**
- **Include screenshots if possible**
- **Include your environment details**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the proposed functionality**
- **Explain why this enhancement would be useful**
- **List potential implementation approaches if possible**

### Pull Requests

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/1-percent-habit-tracker.git
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Make Your Changes**
   - Follow the coding style guide
   - Add or update tests as needed
   - Update documentation as needed

4. **Commit Your Changes**
   ```bash
   git commit -m 'Add: Concise description of your changes'
   ```
   
   Follow our commit message conventions:
   - `Add:` for new features
   - `Fix:` for bug fixes
   - `Update:` for non-breaking changes
   - `Breaking:` for breaking changes
   - `Docs:` for documentation updates
   - `Test:` for test updates
   - `Refactor:` for code refactoring

5. **Push to Your Fork**
   ```bash
   git push origin feature/AmazingFeature
   ```

6. **Open a Pull Request**
   - Fill in the provided PR template
   - Link any relevant issues
   - Include screenshots or examples if applicable

## Development Setup

1. **Prerequisites**
   - Node.js 18+
   - Python 3.11+
   - MongoDB
   - Git

2. **Frontend Setup**
   ```bash
   cd client
   npm install
   cp .env.example .env
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   cd server
   python -m venv venv
   source venv/bin/activate  # or `venv\Scripts\activate` on Windows
   pip install -r requirements.txt
   cp .env.example .env
   python run.py
   ```

## Style Guides

### Git Commit Messages
- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters
- Reference issues and pull requests liberally after the first line

### TypeScript Style Guide
- Use TypeScript for all new code
- Follow the existing code style
- Use interfaces over types when possible
- Document complex functions and components
- Use meaningful variable names

### Python Style Guide
- Follow PEP 8 guidelines
- Use type hints
- Document functions and classes
- Keep functions focused and small

### Testing
- Write tests for new features
- Update tests when modifying features
- Aim for high test coverage
- Test edge cases

## Additional Notes

### Issue Labels
- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Documentation improvements
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention needed

### Documentation

When contributing to documentation:
- Use clear and concise language
- Include code examples when relevant
- Update table of contents if needed
- Check for broken links
- Verify code snippets work

---

Thank you for contributing to 1% Habit Tracker! 🎉 