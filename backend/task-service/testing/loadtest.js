(async () => {
  // Laad de module dynamisch (geschikt voor ES-modules)
  const loadtest = await import('loadtest');

  // Testscenario's
  const scenarios = [
    { url: 'http://localhost:3000/api/tasks', maxRequests: 100, concurrency: 5 },
    { url: 'http://localhost:3000/api/tasks', maxRequests: 1000, concurrency: 10 },
    { url: 'http://localhost:3000/api/tasks', maxRequests: 10000, concurrency: 50 },
  ];

  // Creëer een array van Promises voor alle loadtests
  const promises = scenarios.map((options, index) => {
    return new Promise((resolve, reject) => {
      console.log(`Starting load test scenario ${index + 1} with ${options.maxRequests} requests.`);
      loadtest.loadTest(options, function(error, result) {
        if (error) {
          reject(`Error in scenario ${index + 1}: ${error}`);
        } else {
          console.log(`Results for scenario ${index + 1}:`, result);
          resolve(result); // Je kunt hier resultaten verwerken of opslaan voor latere analyse
        }
      });
    });
  });

  try {
    // Wacht tot alle tests zijn voltooid
    const results = await Promise.all(promises);
    console.log('All load tests completed successfully:', results);
    process.exit(0);  // Als alle tests succesvol zijn, stel je een exit code in van 0
  } catch (error) {
    console.error('One or more tests failed:', error);
    process.exit(1);  // Als er een fout is, stel je een exit code in van 1 om CI te laten falen
  }
})();
