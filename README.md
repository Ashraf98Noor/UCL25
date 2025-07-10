# UCL 24/25 Statistics Dashboard

A dynamic sports statistics website built with React, TypeScript, and Tailwind CSS for analyzing UEFA Champions League 2024/25 player performance data.
### Created using Cursor AI & ChatGPT (o4 mini high)
## Features

### 🏆 Core Functionality
- **Dynamic Data Loading**: CSV data parsing with PapaParse
- **Advanced Filtering**: Filter by player name, team, position, nation, goals, assists, and minutes
- **Interactive Sorting**: Sort by any column with visual indicators
- **Expandable Rows**: Detailed player statistics in expandable table rows
- **Real-time Statistics**: Live dashboard with key metrics and top performers

### 📊 Dashboard Components
- **Key Statistics**: Total players, goals, assists, and average age
- **Top Performers**: Top 5 scorers and assisters with per-90 statistics
- **Filter Summary**: Current view statistics and filter status

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode Ready**: CSS variables for easy theme switching
- **Modern Components**: Clean, accessible UI components
- **Smooth Animations**: Loading states and hover effects

## Tech Stack

### Frontend Framework
- **React 18** with TypeScript for type safety
- **React Hooks** for state management
- **Functional Components** with modern patterns

### Styling & UI
- **Tailwind CSS** for utility-first styling
- **Custom Design System** with CSS variables
- **Responsive Grid Layouts** for all screen sizes

### Data Management
- **Zustand** for lightweight global state management
- **PapaParse** for CSV data parsing
- **TypeScript Interfaces** for type-safe data handling

### Development Tools
- **Create React App** for development environment
- **PostCSS** and **Autoprefixer** for CSS processing
- **ESLint** for code quality

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ashraf98Noor/UCL25.git
   cd ucl-stats-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx          # Main dashboard with statistics
│   ├── Header.tsx            # Application header
│   ├── PlayerTable.tsx       # Interactive data table
│   └── ui/
│       └── button.tsx        # Reusable button component
├── store/
│   └── playerStore.ts        # Zustand state management
├── services/
│   └── csvService.ts         # CSV data loading and parsing
├── types/
│   └── player.ts             # TypeScript interfaces
├── lib/
│   └── utils.ts              # Utility functions
├── App.tsx                   # Main application component
├── index.tsx                 # Application entry point
└── index.css                 # Global styles and Tailwind

public/
├── index.html               # HTML template
└── UCL_24_25_Key_Data - Sheet1.csv  # Data source
```

## Data Structure

The application uses UEFA Champions League 2024/25 player statistics with the following key fields:

### Player Information
- **Basic**: Name, Nation, Position, Team, Birth Year
- **Appearances**: Matches Played, Starts, Minutes, 90s played
- **Performance**: Goals, Assists, Goals+Assists, Penalty Goals

### Advanced Statistics
- **Expected Goals**: xG, npxG (non-penalty xG)
- **Expected Assists**: xAG
- **Progressive Actions**: Progressive Carries, Passes, Receptions
- **Discipline**: Yellow Cards, Red Cards

### Per-90 Metrics
- Goals per 90, Assists per 90, xG per 90, etc.

## Key Features Explained

### 1. Advanced Filtering
- **Text Search**: Search by player name or team
- **Dropdown Filters**: Position, Team, Nation
- **Numeric Filters**: Minimum goals, assists, minutes played
- **Real-time Updates**: Filters apply instantly

### 2. Interactive Table
- **Sortable Columns**: Click headers to sort
- **Visual Indicators**: Arrows show sort direction
- **Expandable Rows**: Click "Details" for comprehensive stats
- **Responsive Design**: Horizontal scroll on mobile

### 3. Dashboard Analytics
- **Key Metrics**: Total players, goals, assists, average age
- **Top Performers**: Best scorers and assisters
- **Per-90 Statistics**: Normalized performance metrics
- **Filter Summary**: Current view statistics

### 4. State Management
- **Zustand Store**: Centralized state management
- **Reactive Updates**: UI updates automatically with data changes
- **Performance Optimized**: Efficient filtering and sorting

## Customization

### Adding New Filters
1. Update `FilterState` interface in `types/player.ts`
2. Add filter logic in `playerStore.ts`
3. Create UI components in `PlayerTable.tsx`

### Adding New Statistics
1. Extend `PlayerStats` interface
2. Add calculation logic in `calculateStats()`
3. Create dashboard components

### Styling Changes
- Modify CSS variables in `index.css`
- Update Tailwind classes in components
- Add new component variants

## Performance Optimizations

- **Efficient Filtering**: Optimized filter algorithms
- **Lazy Loading**: Components load only when needed
- **Memoization**: React.memo for expensive components
- **Virtual Scrolling**: Ready for large datasets

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Responsive**: iOS Safari, Chrome Mobile
- **Progressive Enhancement**: Works without JavaScript (basic)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- UEFA Champions League for the data
- React and TypeScript communities
- Tailwind CSS for the styling framework
