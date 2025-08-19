module.exports = {
  extends: [
    'react-app'
  ],
  rules: {
    // Disable React Hooks rules since you're not using hooks
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
    
    // Optional: Other rules you might want to customize
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'react/prop-types': 'off', // Turn off if you're not using PropTypes
    
    // JSX specific rules
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
  },
  
  // Optional: If you want to ignore certain files
  ignorePatterns: [
    'build/',
    'node_modules/',
    'public/'
  ]
};
