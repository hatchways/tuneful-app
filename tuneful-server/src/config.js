module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DB_URL || 'postgresql://postgres:Latino1041@localhost:5433/spotifysocial',
    JWT_SECRET: process.env.JWT_SECRET || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1NTA5NDQ5NDMsInN1YiI6InRlc3QtdXNlci0xIn0.OQTyYphJrG0lXmh7okySbmlFDgP11mSzlDoyJg7ERs0',
  }