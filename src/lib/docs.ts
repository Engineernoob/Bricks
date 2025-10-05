export interface DocPage {
  slug: string;
  title: string;
  description: string;
  category: string;
  order: number;
  content: string;
}

// Static docs data for client-side rendering
const docPages: DocPage[] = [
  {
    slug: "getting-started",
    title: "Getting Started",
    description: "Learn the basics of building applications with Bricks",
    category: "Basics",
    order: 1,
    content: `Welcome to Bricks, the visual development platform that lets you build powerful applications without writing code. This guide will walk you through creating your first application.

## What is Bricks?

Bricks is a no-code platform that combines the power of modern web technologies with an intuitive visual interface. Whether you're a designer, entrepreneur, or developer looking to prototype quickly, Bricks helps you turn ideas into reality.

### Key Features

- **Visual Development**: Drag-and-drop interface for building complex applications
- **Real-time Collaboration**: Work together with your team in real-time
- **Responsive Design**: Applications that work perfectly on all devices
- **Database Integration**: Connect to external APIs and databases
- **Custom Components**: Create reusable components for consistent design

## Your First Application

Let's build a simple contact form to get you started:

### Step 1: Create a New Project

1. Click the "New Project" button on your dashboard
2. Choose a template or start from scratch
3. Give your project a meaningful name

### Step 2: Add Components

1. Drag a **Form** component onto the canvas
2. Add **Input** fields for name, email, and message
3. Include a **Button** component for submission

### Step 3: Configure the Form

- Set input types (text, email, textarea)
- Add validation rules
- Configure the submit action

### Step 4: Style Your Application

Use the design panel to:
- Adjust colors and typography
- Set spacing and layout
- Add animations and transitions

### Step 5: Preview and Deploy

1. Use the preview feature to test your application
2. Share a preview link with stakeholders
3. Deploy to production when ready

## Next Steps

Once you've built your first application, explore these advanced features:
- Database connections
- User authentication
- Custom components
- API integrations

Ready to dive deeper? Check out our [Component Library](/docs/components) or learn about [Data Management](/docs/data-management).`,
  },
  {
    slug: "components",
    title: "Component Library",
    description: "Complete reference for all available components in Bricks",
    category: "Reference",
    order: 2,
    content: `Bricks provides a comprehensive library of pre-built components that you can use to construct your applications. Each component is designed to be flexible, accessible, and easy to customize.

## Layout Components

### Container
The foundation of your application layout. Containers provide structure and consistent spacing.

**Properties:**
- Max Width: Control the maximum width of content
- Padding: Internal spacing
- Alignment: Center, left, or right alignment

### Grid
Create responsive layouts with our flexible grid system.

**Properties:**
- Columns: 1-12 column layouts
- Gap: Spacing between grid items
- Responsive: Different layouts for mobile, tablet, and desktop

### Stack
Arrange components vertically or horizontally with consistent spacing.

**Properties:**
- Direction: Vertical or horizontal
- Spacing: Gap between items
- Alignment: Start, center, end, or stretch

## Input Components

### Text Input
Single-line text input for names, emails, and short content.

**Properties:**
- Placeholder: Helper text
- Validation: Required, email, custom patterns
- Label: Accessible labeling
- Error States: Custom error messages

### Textarea
Multi-line text input for longer content like messages or descriptions.

**Properties:**
- Rows: Number of visible lines
- Character Limit: Maximum length
- Auto-resize: Expand with content

### Select Dropdown
Allow users to choose from a list of options.

**Properties:**
- Options: List of available choices
- Multiple: Allow multiple selections
- Search: Filter options by typing
- Placeholder: Default text when empty

### Checkbox & Radio
Boolean and single-choice inputs with custom styling.

**Properties:**
- Label: Descriptive text
- Default Value: Pre-selected state
- Validation: Required options
- Group: Related options together

## Display Components

### Text
Display content with full typography control.

**Properties:**
- Content: Static or dynamic text
- Typography: Size, weight, color
- Alignment: Left, center, right, justify
- Links: Clickable text with actions

### Image
Responsive images with automatic optimization.

**Properties:**
- Source: URL or uploaded file
- Alt Text: Accessibility description
- Aspect Ratio: Maintain proportions
- Loading: Lazy loading options

### Card
Structured content containers with headers, bodies, and actions.

**Properties:**
- Header: Title and subtitle
- Content: Body text or components
- Actions: Buttons or links
- Elevation: Shadow depth

## Interactive Components

### Button
Trigger actions and navigation with customizable buttons.

**Properties:**
- Text: Button label
- Variant: Primary, secondary, outline, ghost
- Size: Small, medium, large
- Icon: Leading or trailing icons
- Action: Page navigation, form submission, custom functions

### Link
Navigate between pages or external URLs.

**Properties:**
- Destination: Internal page or external URL
- Target: Same window or new tab
- Style: Inherit text styling or button appearance

## Advanced Components

### Table
Display structured data with sorting and filtering.

**Properties:**
- Data Source: API or manual data
- Columns: Configurable column types
- Sorting: Enable/disable column sorting
- Pagination: Handle large datasets
- Actions: Row-level buttons

### Modal
Overlay content for forms, confirmations, or detailed views.

**Properties:**
- Trigger: Button or link to open
- Size: Small, medium, large, full-screen
- Content: Any combination of components
- Actions: Confirm, cancel, custom buttons

### Tabs
Organize content into switchable sections.

**Properties:**
- Tab Labels: Names for each section
- Content: Components for each tab
- Default: Initially active tab
- Style: Underline, pills, or cards

## Best Practices

### Accessibility
- Always provide descriptive labels
- Use proper heading hierarchy
- Ensure sufficient color contrast
- Support keyboard navigation

### Performance
- Optimize images for web
- Use lazy loading for long pages
- Minimize component nesting
- Cache dynamic content when possible

### User Experience
- Provide clear feedback for actions
- Use consistent spacing and alignment
- Group related components together
- Test on multiple devices and browsers

Each component includes extensive customization options through the visual editor. For complex use cases, components can be combined into reusable custom components that maintain consistency across your application.`,
  },
  {
    slug: "data-management",
    title: "Data Management",
    description: "Connect and manage data sources in your Bricks applications",
    category: "Advanced",
    order: 3,
    content: `Data is the foundation of most modern applications. Bricks provides powerful tools for connecting to external data sources, managing application state, and creating dynamic user experiences.

## Data Sources

### External APIs
Connect to any REST API to pull in external data.

**Supported Methods:**
- GET: Retrieve data
- POST: Create new records
- PUT: Update existing records
- DELETE: Remove records

**Configuration:**
- Base URL: API endpoint
- Headers: Authentication tokens, content types
- Query Parameters: Dynamic filtering and sorting
- Error Handling: Graceful failure management

### Databases
Direct integration with popular database systems.

**Supported Databases:**
- PostgreSQL
- MySQL
- MongoDB
- Supabase
- Airtable

**Features:**
- Real-time updates
- Relationship mapping
- Query optimization
- Data validation

### Local Storage
Store data locally in the user's browser.

**Use Cases:**
- User preferences
- Draft content
- Offline functionality
- Session management

## Data Binding

### Static Data
Hard-coded data that doesn't change during runtime.

**Examples:**
- Navigation menus
- Footer information
- Static content blocks
- Configuration options

### Dynamic Data
Data that updates based on user interactions or external changes.

**Examples:**
- User profiles
- Real-time notifications
- Search results
- Form submissions

### Computed Values
Derived data based on other data sources.

**Examples:**
- Calculated totals
- Formatted dates
- Filtered lists
- Aggregated metrics

## State Management

### Global State
Data shared across multiple components and pages.

**Best Practices:**
- Keep global state minimal
- Use for authentication status
- Store user preferences
- Cache frequently accessed data

### Component State
Data specific to individual components.

**Examples:**
- Form input values
- Modal open/closed status
- Accordion expansion state
- Loading indicators

### URL State
Data stored in the browser URL for shareability.

**Examples:**
- Search queries
- Filter selections
- Page numbers
- Sort orders

## Data Validation

### Client-side Validation
Immediate feedback for better user experience.

**Types:**
- Required fields
- Format validation (email, phone)
- Length constraints
- Custom patterns

### Server-side Validation
Security and data integrity on the backend.

**Features:**
- Business rule enforcement
- Database constraints
- Security checks
- Cross-field validation

## Real-time Updates

### WebSocket Connections
Live data synchronization across multiple users.

**Use Cases:**
- Chat applications
- Collaborative editing
- Live dashboards
- Notification systems

### Polling
Regular data refresh for near real-time updates.

**Configuration:**
- Refresh interval
- Conditional polling
- Error handling
- Performance optimization

## Data Security

### Authentication
Verify user identity before accessing data.

**Methods:**
- JWT tokens
- OAuth providers (Google, GitHub, etc.)
- Custom authentication
- Session management

### Authorization
Control what data users can access and modify.

**Levels:**
- Public: Available to everyone
- Private: User-specific data
- Admin: Administrative access
- Custom: Role-based permissions

### Data Encryption
Protect sensitive information in transit and at rest.

**Features:**
- HTTPS/TLS encryption
- Database encryption
- API key protection
- Sensitive field masking

## Performance Optimization

### Caching
Store frequently accessed data for faster loading.

**Strategies:**
- Browser caching
- Memory caching
- Database query caching
- CDN caching

### Pagination
Handle large datasets efficiently.

**Options:**
- Offset-based pagination
- Cursor-based pagination
- Infinite scrolling
- Virtual scrolling

### Lazy Loading
Load data only when needed.

**Applications:**
- Image loading
- Component initialization
- Data fetching
- Route-based loading

## Error Handling

### Network Errors
Handle connectivity issues gracefully.

**Strategies:**
- Retry mechanisms
- Offline fallbacks
- User notifications
- Graceful degradation

### Data Errors
Manage invalid or missing data.

**Approaches:**
- Default values
- Error boundaries
- Validation feedback
- Alternative content

## Testing Data Integration

### Mock Data
Simulate API responses during development.

**Benefits:**
- Faster development
- Consistent testing
- Offline development
- Error scenario testing

### Data Validation Testing
Ensure data integrity across all scenarios.

**Test Cases:**
- Valid input handling
- Invalid input rejection
- Edge case management
- Performance under load

Data management in Bricks is designed to be both powerful and accessible. Whether you're building a simple contact form or a complex business application, these tools provide the foundation for robust data handling.`,
  },
  {
    slug: "deployment",
    title: "Deployment Guide",
    description: "Deploy your Bricks applications to production environments",
    category: "Advanced",
    order: 4,
    content: `Once your application is ready, Bricks makes it easy to deploy to various hosting platforms. This guide covers deployment options, configuration, and best practices for production environments.

## Deployment Options

### Bricks Hosting
Our managed hosting platform provides the fastest path to production.

**Features:**
- One-click deployment
- Automatic SSL certificates
- Global CDN distribution
- Built-in monitoring
- Automatic backups

**Benefits:**
- No server management required
- Optimized for Bricks applications
- Integrated with the development environment
- 99.9% uptime SLA

### Custom Domains
Connect your own domain to your Bricks application.

**Steps:**
1. Purchase a domain from any registrar
2. Add the domain in your Bricks dashboard
3. Update DNS settings with provided values
4. SSL certificate is automatically generated

### Static Site Generation
Export your application as static files for hosting anywhere.

**Supported Platforms:**
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Any static hosting provider

## Environment Configuration

### Environment Variables
Manage different settings for development, staging, and production.

**Common Variables:**
- API endpoints
- Database connection strings
- Authentication keys
- Feature flags
- Analytics tracking IDs

### Build Settings
Configure how your application is built and optimized.

**Options:**
- Asset optimization
- Code minification
- Bundle splitting
- Source map generation
- Progressive Web App features

## Pre-deployment Checklist

### Performance Optimization
Ensure your application loads quickly and efficiently.

**Key Areas:**
- ✅ Image optimization and compression
- ✅ Minimize external dependencies
- ✅ Enable lazy loading for non-critical content
- ✅ Optimize database queries
- ✅ Use appropriate caching strategies

### Security Review
Protect your application and user data.

**Security Checks:**
- ✅ Remove debugging information
- ✅ Validate all user inputs
- ✅ Secure API endpoints
- ✅ Use HTTPS everywhere
- ✅ Implement proper authentication

### Content Review
Ensure all content is production-ready.

**Content Checks:**
- ✅ Replace placeholder text and images
- ✅ Verify all links work correctly
- ✅ Test form submissions
- ✅ Check contact information
- ✅ Review legal pages (privacy, terms)

### Browser Testing
Test across different browsers and devices.

**Test Matrix:**
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment Process

### Staging Environment
Test your application in a production-like environment.

**Purpose:**
- Final testing before production
- Stakeholder review and approval
- Performance testing under load
- Integration testing with production data

### Production Deployment
Deploy to your live environment.

**Best Practices:**
- Deploy during low-traffic periods
- Monitor application performance closely
- Have a rollback plan ready
- Communicate with stakeholders

### Blue-Green Deployment
Minimize downtime with zero-downtime deployments.

**Process:**
1. Deploy to a parallel environment (green)
2. Test the new version thoroughly
3. Switch traffic from old (blue) to new (green)
4. Monitor for issues and rollback if needed

## Monitoring and Maintenance

### Performance Monitoring
Track how your application performs in production.

**Key Metrics:**
- Page load times
- API response times
- Error rates
- User engagement
- Conversion rates

### Error Tracking
Identify and fix issues quickly.

**Tools Integration:**
- Built-in error logging
- Third-party services (Sentry, Bugsnag)
- Custom alert thresholds
- Automated notifications

### Updates and Maintenance
Keep your application current and secure.

**Regular Tasks:**
- Security updates
- Performance optimizations
- Content updates
- Feature additions
- Bug fixes

## Scaling Your Application

### Traffic Growth
Handle increasing user loads effectively.

**Strategies:**
- CDN distribution
- Database optimization
- Caching layers
- Load balancing
- Resource monitoring

### Feature Expansion
Add new functionality without disrupting existing users.

**Approaches:**
- Feature flags
- A/B testing
- Gradual rollouts
- Backward compatibility
- User feedback integration

## Backup and Recovery

### Data Backup
Protect against data loss.

**Backup Types:**
- Automatic daily backups
- On-demand backups before major changes
- Cross-region backup storage
- Point-in-time recovery

### Disaster Recovery
Plan for worst-case scenarios.

**Recovery Plan:**
- Document recovery procedures
- Test recovery processes regularly
- Maintain backup hosting arrangements
- Establish communication protocols

## Cost Optimization

### Resource Usage
Monitor and optimize hosting costs.

**Optimization Areas:**
- Image compression and formats
- Efficient database queries
- Appropriate caching strategies
- CDN usage optimization
- Unused resource cleanup

### Pricing Tiers
Choose the right hosting plan for your needs.

**Considerations:**
- Traffic volume
- Storage requirements
- Bandwidth usage
- Support level needed
- Growth projections

## Post-Deployment

### Launch Checklist
Ensure everything is working correctly after deployment.

**Immediate Checks:**
- ✅ All pages load correctly
- ✅ Forms submit successfully
- ✅ External integrations work
- ✅ Analytics tracking is active
- ✅ SSL certificate is valid

### Marketing and Promotion
Get the word out about your new application.

**Channels:**
- Social media announcement
- Email newsletter
- Blog post
- Press releases
- Partner notifications

### User Feedback
Collect and respond to user feedback.

**Methods:**
- Feedback forms
- User surveys
- Analytics review
- Support ticket analysis
- Direct user interviews

Deployment is just the beginning. With Bricks' built-in monitoring and maintenance tools, you can ensure your application continues to serve users effectively as it grows and evolves.`,
  },
  {
    slug: "best-practices",
    title: "Best Practices",
    description:
      "Guidelines for building high-quality applications with Bricks",
    category: "Guide",
    order: 5,
    content: `Building applications with Bricks is intuitive, but following these best practices will help you create more maintainable, performant, and user-friendly applications.

## Project Organization

### Naming Conventions
Use clear, consistent naming throughout your project.

**Component Names:**
- Use descriptive names: "UserProfileCard" not "Card1"
- Follow PascalCase for components
- Include context: "NavigationButton" vs "Button"
- Avoid abbreviations unless universally understood

**Page Names:**
- Use descriptive titles that match their purpose
- Include context for similar pages
- Consider SEO implications
- Keep names concise but clear

### File Structure
Organize your project for easy navigation and maintenance.

**Recommended Structure:**
- **Pages**: Top-level application screens
- **Components**: Reusable UI elements
- **Layouts**: Page structure templates
- **Assets**: Images, icons, and other media
- **Data**: API configurations and mock data

### Version Control
Track changes and collaborate effectively.

**Best Practices:**
- Commit changes frequently with descriptive messages
- Use branches for feature development
- Tag releases for easy rollback
- Document major changes in commit messages

## Design System

### Consistent Styling
Maintain visual consistency across your application.

**Color Palette:**
- Define primary, secondary, and accent colors
- Use consistent colors for states (success, warning, error)
- Maintain sufficient contrast for accessibility
- Document color usage guidelines

**Typography:**
- Establish a clear hierarchy (H1, H2, H3, etc.)
- Use consistent font families throughout
- Set appropriate line heights and spacing
- Consider readability across devices

**Spacing System:**
- Use consistent spacing values (8px, 16px, 24px, etc.)
- Maintain consistent margins and padding
- Create visual rhythm with spacing
- Use white space effectively

### Component Consistency
Create and reuse components for consistency.

**Reusable Components:**
- Build a library of common elements
- Standardize button styles and states
- Create consistent form field designs
- Establish card and layout patterns

## User Experience

### Navigation Design
Make it easy for users to find what they need.

**Principles:**
- Keep navigation simple and predictable
- Use familiar patterns and conventions
- Provide clear visual hierarchy
- Include search when appropriate
- Ensure mobile-friendly navigation

### Form Design
Create forms that are easy to use and understand.

**Best Practices:**
- Group related fields logically
- Use clear labels and helpful hints
- Provide immediate validation feedback
- Show progress for multi-step forms
- Make error messages specific and helpful

### Loading States
Keep users informed during wait times.

**Strategies:**
- Show loading indicators for slow operations
- Use skeleton screens for content placeholders
- Provide progress indicators for long processes
- Offer cancel options when appropriate
- Set realistic expectations for wait times

### Error Handling
Help users recover from errors gracefully.

**Error Messages:**
- Be specific about what went wrong
- Suggest concrete steps to fix the issue
- Use friendly, non-technical language
- Provide contact information for help
- Avoid blame and frustration

## Performance

### Optimize Images
Ensure fast loading times with optimized media.

**Image Optimization:**
- Use appropriate file formats (WebP, JPEG, PNG)
- Compress images without losing quality
- Use responsive images for different screen sizes
- Implement lazy loading for below-the-fold content
- Consider using a CDN for image delivery

### Database Efficiency
Structure data queries for optimal performance.

**Query Optimization:**
- Fetch only the data you need
- Use appropriate indexes
- Implement pagination for large datasets
- Cache frequently accessed data
- Monitor query performance

### Code Organization
Write maintainable code that performs well.

**Development Practices:**
- Keep components focused on single responsibilities
- Avoid deep nesting of components
- Reuse code through custom components
- Document complex logic
- Regular code reviews and refactoring

## Accessibility

### Universal Design
Make your application usable by everyone.

**Key Areas:**
- Provide alternative text for images
- Ensure keyboard navigation works everywhere
- Use sufficient color contrast
- Include focus indicators for interactive elements
- Test with screen readers

### Semantic Structure
Use proper HTML structure for assistive technologies.

**Structure Elements:**
- Use heading hierarchy properly (H1, H2, H3)
- Mark up lists as actual lists
- Use form labels correctly
- Implement proper table structures
- Include landmark regions (nav, main, footer)

## Security

### Data Protection
Safeguard user information and application integrity.

**Security Measures:**
- Validate all user inputs
- Use HTTPS for all communications
- Implement proper authentication
- Store sensitive data securely
- Regular security audits and updates

### Privacy Considerations
Respect user privacy and comply with regulations.

**Privacy Practices:**
- Collect only necessary data
- Provide clear privacy policies
- Implement user consent mechanisms
- Allow users to control their data
- Comply with GDPR, CCPA, and other regulations

## Testing

### Quality Assurance
Ensure your application works reliably.

**Testing Areas:**
- Test all user flows thoroughly
- Verify forms submit correctly
- Check responsive design on multiple devices
- Test with different browsers
- Validate accessibility features

### User Testing
Get feedback from real users before launch.

**Testing Methods:**
- Conduct usability testing sessions
- Gather feedback through surveys
- Monitor user behavior with analytics
- Iterate based on user feedback
- Test with diverse user groups

## Maintenance

### Regular Updates
Keep your application current and secure.

**Update Schedule:**
- Security updates immediately
- Feature updates monthly
- Content reviews quarterly
- Performance audits annually
- User feedback reviews ongoing

### Documentation
Maintain clear documentation for future reference.

**Documentation Types:**
- User guides and help articles
- Technical specifications
- Design system documentation
- API documentation
- Change logs and release notes

## Collaboration

### Team Communication
Work effectively with designers, developers, and stakeholders.

**Communication Practices:**
- Regular check-ins and status updates
- Clear requirement documentation
- Shared design systems and standards
- Version control with meaningful commits
- Feedback loops and iteration cycles

### Stakeholder Management
Keep stakeholders informed and engaged.

**Stakeholder Practices:**
- Regular progress demonstrations
- Clear milestone definitions
- Feedback collection and prioritization
- Expectation management
- Change request processes

Following these best practices will help you build applications that are not only functional but also maintainable, accessible, and delightful to use. Remember that best practices evolve, so stay current with industry standards and user expectations.`,
  },
  {
    slug: "api-reference",
    title: "API Reference",
    description: "Complete API documentation for integrating with Bricks",
    category: "Reference",
    order: 6,
    content: `The Bricks API provides programmatic access to your applications, data, and platform features. This reference covers all available endpoints, authentication methods, and integration patterns.

## Authentication

### API Keys
Authenticate your requests using API keys.

**Getting Your API Key:**
1. Navigate to Settings > API Keys in your dashboard
2. Click "Generate New Key"
3. Copy and store the key securely
4. Never expose API keys in client-side code

**Usage:**
\`\`\`
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
\`\`\`

### OAuth 2.0
Use OAuth for user-specific operations.

**Supported Flows:**
- Authorization Code Flow (recommended)
- Implicit Flow (for single-page apps)
- Client Credentials Flow (for server-to-server)

**Scopes:**
- \`read\`: Read access to user data
- \`write\`: Create and update data
- \`admin\`: Administrative operations
- \`deploy\`: Deployment permissions

## Base URL

All API requests should be made to:
\`\`\`
https://api.bricks.dev/v1
\`\`\`

## Projects

### List Projects
Get all projects accessible to the authenticated user.

**Endpoint:** \`GET /projects\`

**Parameters:**
- \`limit\` (optional): Number of projects to return (default: 20, max: 100)
- \`offset\` (optional): Number of projects to skip (default: 0)
- \`status\` (optional): Filter by project status (\`active\`, \`archived\`, \`draft\`)

**Response:**
\`\`\`json
{
  "projects": [
    {
      "id": "proj_123456",
      "name": "My Portfolio",
      "description": "Personal portfolio website",
      "status": "active",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-20T14:45:00Z",
      "url": "https://my-portfolio.bricks.app"
    }
  ],
  "total": 1,
  "has_more": false
}
\`\`\`

### Create Project
Create a new project.

**Endpoint:** \`POST /projects\`

**Request Body:**
\`\`\`json
{
  "name": "New Project",
  "description": "Project description",
  "template": "blank" // or template ID
}
\`\`\`

### Get Project
Retrieve a specific project by ID.

**Endpoint:** \`GET /projects/{project_id}\`

**Response:**
\`\`\`json
{
  "id": "proj_123456",
  "name": "My Portfolio",
  "description": "Personal portfolio website",
  "status": "active",
  "pages": [
    {
      "id": "page_789",
      "name": "Home",
      "path": "/",
      "status": "published"
    }
  ],
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z"
}
\`\`\`

### Update Project
Update project settings.

**Endpoint:** \`PATCH /projects/{project_id}\`

**Request Body:**
\`\`\`json
{
  "name": "Updated Project Name",
  "description": "Updated description",
  "status": "archived"
}
\`\`\`

### Delete Project
Delete a project permanently.

**Endpoint:** \`DELETE /projects/{project_id}\`

**Response:** \`204 No Content\`

## Pages

### List Pages
Get all pages in a project.

**Endpoint:** \`GET /projects/{project_id}/pages\`

**Response:**
\`\`\`json
{
  "pages": [
    {
      "id": "page_789",
      "name": "Home",
      "path": "/",
      "status": "published",
      "meta": {
        "title": "Home Page",
        "description": "Welcome to my site"
      },
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-20T14:45:00Z"
    }
  ]
}
\`\`\`

### Create Page
Add a new page to a project.

**Endpoint:** \`POST /projects/{project_id}/pages\`

**Request Body:**
\`\`\`json
{
  "name": "About",
  "path": "/about",
  "template": "page_template_id", // optional
  "meta": {
    "title": "About Us",
    "description": "Learn more about our company"
  }
}
\`\`\`

### Get Page Content
Retrieve the full content and structure of a page.

**Endpoint:** \`GET /projects/{project_id}/pages/{page_id}\`

**Response:**
\`\`\`json
{
  "id": "page_789",
  "name": "Home",
  "path": "/",
  "status": "published",
  "content": {
    "components": [...],
    "layout": {...},
    "styles": {...}
  },
  "meta": {
    "title": "Home Page",
    "description": "Welcome to my site"
  }
}
\`\`\`

## Deployments

### List Deployments
Get deployment history for a project.

**Endpoint:** \`GET /projects/{project_id}/deployments\`

**Response:**
\`\`\`json
{
  "deployments": [
    {
      "id": "deploy_456",
      "status": "success",
      "environment": "production",
      "url": "https://my-site.bricks.app",
      "started_at": "2024-01-20T14:30:00Z",
      "completed_at": "2024-01-20T14:32:00Z"
    }
  ]
}
\`\`\`

### Create Deployment
Deploy a project to an environment.

**Endpoint:** \`POST /projects/{project_id}/deployments\`

**Request Body:**
\`\`\`json
{
  "environment": "production", // or "staging"
  "message": "Deploy latest changes"
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": "deploy_456",
  "status": "pending",
  "environment": "production",
  "started_at": "2024-01-20T14:30:00Z"
}
\`\`\`

## Data Management

### List Data Sources
Get all data sources for a project.

**Endpoint:** \`GET /projects/{project_id}/data-sources\`

### Create Data Source
Connect a new data source.

**Endpoint:** \`POST /projects/{project_id}/data-sources\`

**Request Body:**
\`\`\`json
{
  "name": "Customer Database",
  "type": "postgresql",
  "config": {
    "host": "db.example.com",
    "port": 5432,
    "database": "customers",
    "ssl": true
  },
  "credentials": {
    "username": "db_user",
    "password": "secure_password"
  }
}
\`\`\`

### Query Data
Execute queries against connected data sources.

**Endpoint:** \`POST /projects/{project_id}/data-sources/{source_id}/query\`

**Request Body:**
\`\`\`json
{
  "query": "SELECT * FROM customers WHERE active = true",
  "parameters": {
    "limit": 100
  }
}
\`\`\`

## Webhooks

### List Webhooks
Get all webhooks for a project.

**Endpoint:** \`GET /projects/{project_id}/webhooks\`

### Create Webhook
Set up a new webhook endpoint.

**Endpoint:** \`POST /projects/{project_id}/webhooks\`

**Request Body:**
\`\`\`json
{
  "url": "https://your-app.com/webhook",
  "events": ["deployment.completed", "page.updated"],
  "secret": "webhook_secret_for_verification"
}
\`\`\`

## Error Handling

### HTTP Status Codes
The API uses standard HTTP status codes:

- \`200\`: Success
- \`201\`: Created
- \`204\`: No Content
- \`400\`: Bad Request
- \`401\`: Unauthorized
- \`403\`: Forbidden
- \`404\`: Not Found
- \`422\`: Validation Error
- \`429\`: Rate Limited
- \`500\`: Internal Server Error

### Error Response Format
\`\`\`json
{
  "error": {
    "code": "validation_error",
    "message": "The request data is invalid",
    "details": [
      {
        "field": "name",
        "message": "Name is required"
      }
    ]
  }
}
\`\`\`

## Rate Limiting

API requests are rate limited to ensure fair usage:

- **Free tier**: 100 requests per hour
- **Pro tier**: 1,000 requests per hour
- **Enterprise**: Custom limits

Rate limit headers are included in every response:
\`\`\`
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
\`\`\`

## SDKs and Libraries

### Official SDKs
- **JavaScript/Node.js**: \`npm install @bricks/api\`
- **Python**: \`pip install bricks-api\`
- **PHP**: \`composer require bricks/api\`
- **Ruby**: \`gem install bricks-api\`

### Example Usage (JavaScript)
\`\`\`javascript
import { BricksAPI } from '@bricks/api';

const client = new BricksAPI({
  apiKey: 'your_api_key'
});

// List projects
const projects = await client.projects.list();

// Create a new page
const page = await client.pages.create('proj_123', {
  name: 'About',
  path: '/about'
});
\`\`\`

## OpenAPI Specification

Download the complete OpenAPI 3.0 specification:
\`\`\`
https://api.bricks.dev/v1/openapi.json
\`\`\`

This specification can be used with tools like Postman, Insomnia, or code generators to create custom integrations.

## Support

For API support:
- **Documentation**: [docs.bricks.dev/api](https://docs.bricks.dev/api)
- **Community**: [community.bricks.dev](https://community.bricks.dev)
- **Email**: api-support@bricks.dev
- **Status Page**: [status.bricks.dev](https://status.bricks.dev)

The API is versioned and we maintain backward compatibility. Breaking changes will be introduced in new versions with advance notice and migration guides.`,
  },
];

export async function getAllDocs(): Promise<DocPage[]> {
  return Promise.resolve(docPages.sort((a, b) => a.order - b.order));
}

export async function getDocBySlug(slug: string): Promise<DocPage | null> {
  const docs = await getAllDocs();
  return docs.find((doc) => doc.slug === slug) || null;
}

export function groupDocsByCategory(
  docs: DocPage[],
): Record<string, DocPage[]> {
  return docs.reduce(
    (groups, doc) => {
      const category = doc.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(doc);
      return groups;
    },
    {} as Record<string, DocPage[]>,
  );
}
