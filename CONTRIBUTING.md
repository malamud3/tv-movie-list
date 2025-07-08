# Contributing to TV Movie List

Thank you for your interest in contributing to TV Movie List! We welcome contributions from the community and are excited to see what you'll bring to the project.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git
- A TMDB API key

### Setup Development Environment
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/tv-movie-list.git
   cd tv-movie-list
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file with your TMDB API key:
   ```env
   VITE_API_KEY=your_tmdb_api_key
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## 🎯 How to Contribute

### 🐛 Reporting Bugs
- Use the GitHub issue tracker
- Include detailed steps to reproduce
- Provide environment information (OS, browser, Node.js version)
- Include screenshots if applicable

### 💡 Suggesting Features
- Open an issue with the "feature request" label
- Describe the feature and its benefits
- Provide examples or mockups if possible

### 🔧 Code Contributions

#### Types of Contributions We Welcome
- Bug fixes
- New features
- Performance improvements
- Documentation updates
- UI/UX improvements
- Test coverage improvements

#### Development Process
1. **Create a branch** for your feature/fix:
   ```bash
   git checkout -b feature/amazing-feature
   ```
2. **Make your changes** following our coding standards
3. **Test thoroughly** - ensure all existing tests pass
4. **Commit with clear messages**:
   ```bash
   git commit -m "feat: add amazing feature"
   ```
5. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request** with a clear title and description

## 📝 Coding Standards

### TypeScript
- Use TypeScript for all new code
- Define proper interfaces and types
- Use strict mode settings
- Avoid `any` type - use proper typing

### React
- Use functional components with hooks
- Follow React best practices
- Use memo for performance optimization when needed
- Proper prop types and default values

### CSS
- Use CSS Modules for component styling
- Follow BEM naming convention
- Responsive design first
- Dark/light mode support

### Code Style
- Use ESLint configuration provided
- Consistent indentation (2 spaces)
- Clear, descriptive variable names
- Comment complex logic
- Remove console.logs before committing

## 🧪 Testing

### Running Tests
```bash
npm run test
```

### Testing Guidelines
- Write tests for new features
- Update tests for modified functionality
- Ensure all tests pass before submitting PR
- Include both unit and integration tests

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── UI/             # Generic components (buttons, modals, etc.)
│   ├── MovieList/      # Movie/TV listing components
│   └── ...
├── pages/              # Page components
├── services/           # API services and external integrations
├── util/               # Utility functions and custom hooks
├── interface/          # TypeScript interfaces and types
└── layouts/            # Layout components
```

## 🎨 Design Guidelines

### UI/UX Principles
- **Consistency**: Use existing design patterns
- **Accessibility**: Follow WCAG guidelines
- **Responsiveness**: Mobile-first design
- **Performance**: Optimize for speed and efficiency

### Color Palette
- Primary: #e50914 (Netflix red)
- Background: Dark theme with glass-morphism
- Accent: #ffd700 (Gold for favorites)
- Text: High contrast white/dark

## 🔧 Development Tips

### Performance Best Practices
- Use React.memo for expensive components
- Implement proper loading states
- Optimize images and assets
- Use lazy loading for components

### API Integration
- Handle loading and error states
- Implement proper caching with TanStack Query
- Use debouncing for search inputs
- Respect API rate limits

## 📋 Pull Request Guidelines

### Before Submitting
- [ ] Code follows project coding standards
- [ ] All tests pass
- [ ] Documentation updated if needed
- [ ] No console.logs or debug code
- [ ] Responsive design tested
- [ ] Accessibility tested

### PR Title Format
- `feat: add new feature`
- `fix: resolve bug in component`
- `docs: update README`
- `style: improve CSS styling`
- `refactor: optimize component logic`

### PR Description Should Include
- Clear description of changes
- Screenshots for UI changes
- Testing instructions
- Breaking changes (if any)
- Related issue numbers

## 🚨 Important Notes

### Security
- Never commit API keys or sensitive information
- Use environment variables for configuration
- Validate all user inputs
- Follow security best practices

### License
- All contributions will be licensed under MIT
- Ensure you have rights to contribute the code
- Give credit to external libraries/resources used

## 🎓 Learning Resources

### React/TypeScript
- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### API Integration
- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [TanStack Query Guide](https://tanstack.com/query/latest)

## 🤝 Code of Conduct

### Our Standards
- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

### Unacceptable Behavior
- Harassment or discrimination
- Spam or off-topic comments
- Sharing private information
- Trolling or inflammatory comments

## 📞 Getting Help

### Community Support
- GitHub Discussions for questions
- Issue tracker for bugs and features
- Code review feedback in PRs

### Maintainer Contact
- Open an issue for project-related questions
- Email for urgent security concerns
- Be patient - we're volunteers!

## 🙏 Recognition

Contributors will be recognized in:
- GitHub contributors list
- README acknowledgments
- Release notes for significant contributions

---

Thank you for contributing to TV Movie List! Your efforts help make this project better for everyone. 🎬✨
