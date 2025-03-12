import fs from 'fs';

const dependencyDictionary = JSON.parse(fs.readFileSync('./dependencyDictionary.json', 'utf8'));

function loadDependencies(dependencies) {
    const promises = Object.keys(dependencies).map(dep => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = dependencies[dep];
            script.onload = () => resolve(dep);
            script.onerror = () => reject(new Error(`Failed to load ${dep}`));
            document.head.appendChild(script);
        });
    });

    return Promise.all(promises);
}

loadDependencies(dependencyDictionary)
    .then(loadedDeps => {
        console.log('Dependencies loaded:', loadedDeps);
        // Initialize your application here
    })
    .catch(error => {
        console.error('Error loading dependencies:', error);
    });
