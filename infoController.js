const getInfo = (req, res) => {
  res.json({
    appName: "Nouha's App",
    currentDate: new Date().toISOString()
  });
};

module.exports = {
  getInfo
};