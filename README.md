# HR Payroll Management System

A comprehensive Human Resources and Payroll management application built with Next.js, TypeScript, shadcn/ui, and Tailwind CSS.

## 🚀 Features

### 🏢 **Dashboard**
- Real-time HR metrics and statistics
- Employee count and status breakdown
- Payroll summaries and upcoming payments
- Department analytics and distribution
- Recent hires tracking

### 👥 **Employee Management**
- Complete employee database with comprehensive profiles
- Advanced search and filtering capabilities
- Employee status management (Active, Inactive, Terminated)
- Personal information, employment details, and payroll information
- Emergency contacts and address management
- Full CRUD operations for employee records

### 💰 **Payroll Processing**
- Payroll period management
- Automated salary calculations
- Tax and deduction processing
- Pay slip generation and management
- Multiple pay frequencies (Weekly, Bi-weekly, Monthly)
- Overtime calculations

### 📄 **Pay Slips**
- Detailed pay slip viewing and management
- Search and filter functionality
- Export capabilities
- Historical records
- Comprehensive breakdown of gross pay, deductions, and net pay

### 🏢 **Department Management**
- Department overview and statistics
- Employee distribution by department
- Department-wise salary analysis
- Average salary tracking

### 🎁 **Benefits Administration**
- Benefits package management
- Enrollment tracking and statistics
- Health, dental, retirement, and life insurance
- Benefits cost analysis
- Employee participation rates

### ⚙️ **Settings & Configuration**
- Company information management
- Payroll settings and tax configuration
- Notification preferences
- Security settings
- Integration management

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Context + useReducer
- **Data Persistence**: localStorage (production-ready for database integration)
- **Notifications**: Sonner

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── benefits/          # Benefits management
│   ├── departments/       # Department management
│   ├── employees/         # Employee management
│   ├── payroll/          # Payroll processing
│   ├── payslips/         # Pay slip management
│   ├── settings/         # System settings
│   └── page.tsx          # Dashboard
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── dashboard/        # Dashboard-specific components
│   ├── employees/        # Employee management components
│   └── layout/           # Layout components (Sidebar, Header)
├── contexts/
│   └── HRContext.tsx     # Application state management
├── lib/
│   ├── mock-data.ts      # Sample data for development
│   └── utils.ts          # Utility functions
└── types/
    └── index.ts          # TypeScript type definitions
```

## 🎯 Key Features

### Modern UI/UX
- Clean, professional interface
- Fully responsive design
- Intuitive navigation
- Search functionality across all modules
- Toast notifications for user feedback

### Data Management
- Real-time data updates
- Automatic data persistence
- Comprehensive filtering and search
- Data validation and error handling
- Mock data for development and testing

### Employee Profiles
Each employee record includes:
- Personal information (name, contact, address)
- Employment details (position, department, salary, status)
- Payroll information (bank details, tax ID, deductions)
- Emergency contacts
- Employment history

### Payroll System
- Automated calculations based on salary and hours
- Tax calculations (Federal, State, Social Security, Medicare)
- Deduction processing (Health insurance, 401k, dental, etc.)
- Net pay computation
- Pay slip generation with detailed breakdowns

## 🔧 Customization

### Adding New Employee Fields
1. Update the `Employee` interface in `src/types/index.ts`
2. Modify the form in `components/employees/EmployeeFormDialog.tsx`
3. Update the table display in `components/employees/EmployeeTable.tsx`

### Styling
- Tailwind CSS for utility-first styling
- shadcn/ui for consistent component design
- Custom theme configuration in `globals.css`

## 🚀 Production Deployment

The application is ready for deployment on platforms like:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Railway**
- **Docker containers**

For database integration, consider:
- **PostgreSQL** with Prisma ORM
- **MongoDB** with Mongoose
- **Supabase** for full-stack solution
- **PlanetScale** for MySQL

## 🔮 Future Enhancements

- **Authentication & Authorization** - User roles and permissions
- **API Integration** - Banking APIs, tax services
- **Advanced Reporting** - Charts, analytics, export to Excel/PDF
- **Time Tracking** - Clock in/out, timesheet management
- **Employee Self-Service** - Portal for employees to view pay slips
- **Mobile App** - React Native or PWA

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using Next.js, TypeScript, and shadcn/ui**
