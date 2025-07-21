# App Explorer Custom Element

A standalone custom element component that creates an interactive physics simulation visualization of Wix App Market data. Each app is represented as a falling square, with the size proportional to the number of sites where the app is installed.

## Features

- **Physics Simulation**: Uses Matter.js for realistic physics interactions
- **Interactive Squares**: Click on squares to see app details
- **Draggable Objects**: Drag squares around to interact with the simulation
- **Configurable Settings**: Customize canvas size, square sizes, and animation timing
- **Event System**: Listen for square click events to integrate with your application
- **Dynamic Data Loading**: Loads CSV data from a configurable URL
- **Responsive Design**: Adapts to different container sizes

## Installation

### For Wix Integration

1. Copy the `custom-element-template.js` file to your Wix project
2. Add the script to your page using the HTML embed element
3. Use the custom element in your HTML

### For Standalone Use

1. Include the custom element script in your HTML:
```html
<script src="custom-element-template.js"></script>
```

2. Use the custom element:
```html
<custom-element id="appExplorer"></custom-element>
```

## Basic Usage

### Simple Implementation

```html
<!DOCTYPE html>
<html>
<head>
    <script src="custom-element-template.js"></script>
</head>
<body>
    <custom-element id="appExplorer"></custom-element>
    
    <script>
        const appExplorer = document.getElementById('appExplorer');
        
        // Listen for square clicks
        appExplorer.addEventListener('square-clicked', (event) => {
            const { data, index } = event.detail;
            console.log('Clicked app:', data);
        });
    </script>
</body>
</html>
```

### With Custom Settings

```html
<custom-element 
    id="appExplorer"
    settings='{"canvasWidth": 1000, "canvasHeight": 600, "minSize": 15, "maxSize": 50, "dropDelay": 30}'>
</custom-element>
```

## Configuration Options

The custom element accepts the following settings:

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `canvasWidth` | number | 1200 | Width of the canvas in pixels |
| `canvasHeight` | number | 800 | Height of the canvas in pixels |
| `dataUrl` | string | '/app-data.csv' | URL to load CSV data from |
| `minSize` | number | 20 | Minimum square size in pixels |
| `maxSize` | number | 60 | Maximum square size in pixels |
| `dropDelay` | number | 50 | Delay between square drops in milliseconds |

## API Methods

### Public Methods

#### `updateSettings(newSettings)`
Update the component settings and restart the simulation.

```javascript
appExplorer.updateSettings({
    canvasWidth: 1000,
    canvasHeight: 600,
    minSize: 15,
    maxSize: 50
});
```

#### `reset()`
Reset the simulation to its initial state.

```javascript
appExplorer.reset();
```

#### `getData()`
Get the loaded CSV data.

```javascript
const data = appExplorer.getData();
console.log('Total apps:', data.length);
```

#### `getStats()`
Get statistics about the loaded data.

```javascript
const stats = appExplorer.getStats();
console.log('Total apps:', stats.totalApps);
console.log('Min sites:', stats.minSites);
console.log('Max sites:', stats.maxSites);
```

## Events

### `square-clicked`
Fired when a user clicks on a square in the simulation.

```javascript
appExplorer.addEventListener('square-clicked', (event) => {
    const { data, index } = event.detail;
    
    // data contains the app information:
    // - app_name: Name of the app
    // - sites_installed: Number of sites where installed
    // - app_id: Unique app identifier
    // - account_name: Developer account name
    // - url: App market URL
    // - components_type: Type of app components
    // - and other CSV columns...
    
    console.log('Clicked app:', data.app_name);
    console.log('Sites installed:', data.sites_installed);
});
```

## Data Format

The component expects CSV data with the following columns:

- `app_id`: Unique identifier for the app
- `app_name`: Name of the app
- `sites_installed`: Number of sites where the app is installed (used for square size)
- `account_name`: Developer account name
- `url`: App market URL
- `components_type`: Type of app components
- Additional columns are supported and will be included in the click event data

## Examples

### Test Files

1. **`test.html`** - Full-featured test page with controls and statistics
2. **`simple-example.html`** - Basic implementation example

### Wix Integration Example

```html
<!-- In Wix HTML embed element -->
<div style="text-align: center; padding: 20px;">
    <h2>App Market Visualization</h2>
    <custom-element id="appExplorer"></custom-element>
    
    <div id="appInfo" style="margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 8px; display: none;">
        <h3>Selected App</h3>
        <div id="appDetails"></div>
    </div>
</div>

<script src="custom-element-template.js"></script>
<script>
    customElements.whenDefined('custom-element').then(() => {
        const appExplorer = document.getElementById('appExplorer');
        
        appExplorer.addEventListener('square-clicked', (event) => {
            const { data } = event.detail;
            const appInfo = document.getElementById('appInfo');
            const appDetails = document.getElementById('appDetails');
            
            appDetails.innerHTML = `
                <p><strong>${data.app_name}</strong></p>
                <p>Installed on ${data.sites_installed} sites</p>
                <p>By: ${data.account_name}</p>
            `;
            
            appInfo.style.display = 'block';
        });
    });
</script>
```

## Browser Compatibility

- Chrome 67+
- Firefox 63+
- Safari 11.1+
- Edge 79+

## Dependencies

- **Matter.js**: Loaded dynamically from CDN (https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js)

## Troubleshooting

### Common Issues

1. **Squares not appearing**: Check that the CSV data URL is accessible and the data format is correct
2. **Physics not working**: Ensure Matter.js is loading properly (check browser console for errors)
3. **Events not firing**: Make sure you're listening for events after the custom element is defined

### Debug Mode

Enable console logging by checking the browser console. The component logs initialization steps and data loading progress.

## License

This component is provided as-is for integration into Wix and other web applications.
