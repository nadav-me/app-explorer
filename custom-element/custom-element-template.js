class CustomElement extends HTMLElement {
    
    constructor() {
        super();
        console.log('Custom element constructor called');

        // Global settings with defaults
        this.settings = {
            canvasWidth: 1200,
            canvasHeight: 800,
            dataUrl: '/app-data.csv',
            minSize: 20,
            maxSize: 60,
            dropDelay: 50
        };

        // Global state
        this.isLoaded = false;
        this.engine = null;
        this.render = null;
        this.runner = null;
        this.data = null;
        this.minValue = null;
        this.maxValue = null;
        this.canvasContainer = null;
        this.env = 'development';

        this.mockData = [
            {
                "app_id": "b06f2ef6-a9af-43b9-ab7c-2749448a41e8",
                "first_publish_date": "2023-07-26 11:42:10",
                "first_blocks_publish_date": "2023-07-26 11:42:10",
                "app_name": "Clock: Time, Countdown & More",
                "days_to_publish": "1",
                "components_type": "back office page, panel, studio, studio widget, webhook, widget plugin",
                "url": "https://wix.com/app-market/b06f2ef6-a9af-43b9-ab7c-2749448a41e8/",
                "account_name": "Certified Code",
                "is_pure_blocks": "FALSE",
                "is_classic_blocks": "TRUE",
                "is_velo": "FALSE",
                "sites_installed": "31322",
                "app_icon": "https://static.wixstatic.com/media/d0220c_4d0ea46aa73b463db5ccc5e53c769baf~mv2.webp"
            },
            {
                "app_id": "c9064755-5cc8-4faf-a5a6-41a0150a6640",
                "first_publish_date": "2021-09-02 10:48:03",
                "first_blocks_publish_date": "2024-02-08 8:49:22",
                "app_name": "Fera Reviews",
                "days_to_publish": "218",
                "components_type": "back office page, code package, embedded script, panel, studio, studio widget, webhook, widget plugin",
                "url": "https://wix.com/app-market/c9064755-5cc8-4faf-a5a6-41a0150a6640/",
                "account_name": "Fera",
                "is_pure_blocks": "FALSE",
                "is_classic_blocks": "FALSE",
                "is_velo": "TRUE",
                "sites_installed": "24460",
                "app_icon": "https://static.wixstatic.com/media/d0220c_cafd01c1888d4d58bf6b52d5e7c856d7~mv2.webp"
            },
            {
                "app_id": "375d9fb7-c538-4db1-9363-c5f789a88151",
                "first_publish_date": "2023-12-10 12:50:08",
                "first_blocks_publish_date": "2023-12-10 12:50:09",
                "app_name": "Calendly Connector Booking",
                "days_to_publish": "22",
                "components_type": "code package, data component, studio, studio widget, webhook",
                "url": "https://wix.com/app-market/375d9fb7-c538-4db1-9363-c5f789a88151/",
                "account_name": "null",
                "is_pure_blocks": "FALSE",
                "is_classic_blocks": "TRUE",
                "is_velo": "TRUE",
                "sites_installed": "19650",
                "app_icon": "https://static.wixstatic.com/media/d0220c_42100009989d4ee396261ac851aeea38~mv2.webp"
            },
            {
                "app_id": "3495efc2-56a9-41e9-bb3c-8c9b3b3ab501",
                "first_publish_date": "2024-01-11 9:46:38",
                "first_blocks_publish_date": "2024-01-11 9:46:39",
                "app_name": "PDF: View with 3D Flip Effects",
                "days_to_publish": "9",
                "components_type": "back office page, code package, data component, panel, studio, studio widget, webhook, widget plugin",
                "url": "https://wix.com/app-market/3495efc2-56a9-41e9-bb3c-8c9b3b3ab501/",
                "account_name": "Certified Code",
                "is_pure_blocks": "FALSE",
                "is_classic_blocks": "FALSE",
                "is_velo": "TRUE",
                "sites_installed": "18973",
                "app_icon": "https://static.wixstatic.com/media/d0220c_91d928d97b414775bf6dc0a744e716db~mv2.webp"
            },
            {
                "app_id": "89c625b0-18ef-435c-bef3-85fa9b03928b",
                "first_publish_date": "2023-06-28 10:43:36",
                "first_blocks_publish_date": "2023-06-28 10:43:37",
                "app_name": "YouTube Playlist Player",
                "days_to_publish": "10",
                "components_type": "back office page, code package, panel, studio, studio widget, webhook",
                "url": "https://wix.com/app-market/89c625b0-18ef-435c-bef3-85fa9b03928b/",
                "account_name": "VanyaDoing",
                "is_pure_blocks": "FALSE",
                "is_classic_blocks": "TRUE",
                "is_velo": "TRUE",
                "sites_installed": "18594",
                "app_icon": "https://static.wixstatic.com/media/d0220c_a0fc3c8a50b54be0a54c986757ea211e~mv2.webp"
            },
            {
                "app_id": "a5dd7ce8-07c2-4251-8d58-9657c1a43163",
                "first_publish_date": "2024-07-17 11:41:16",
                "first_blocks_publish_date": "2024-07-17 11:41:16",
                "app_name": "Instagram Feed Social",
                "days_to_publish": "131",
                "components_type": "back office page, code package, data component, panel, studio, studio widget",
                "url": "https://wix.com/app-market/a5dd7ce8-07c2-4251-8d58-9657c1a43163/",
                "account_name": "null",
                "is_pure_blocks": "FALSE",
                "is_classic_blocks": "TRUE",
                "is_velo": "TRUE",
                "sites_installed": "14931",
                "app_icon": "https://static.wixstatic.com/media/d0220c_4f484840ed784f04bfcbc56b0e1be99e~mv2.webp"
            },
            {
                "app_id": "50b1bebe-6887-4ba1-bd12-c2c80208a2be",
                "first_publish_date": "2024-10-08 8:13:33",
                "first_blocks_publish_date": "2024-10-08 8:13:34",
                "app_name": "Profy Countdown Timer Bar",
                "days_to_publish": "37",
                "components_type": "back office page, back office sidebar category, code package, embedded script, studio, studio widget, topology",
                "url": "https://wix.com/app-market/50b1bebe-6887-4ba1-bd12-c2c80208a2be/",
                "account_name": "null",
                "is_pure_blocks": "FALSE",
                "is_classic_blocks": "FALSE",
                "is_velo": "TRUE",
                "sites_installed": "12338",
                "app_icon": "https://static.wixstatic.com/media/d0220c_5dd120bf8c104ad4bfab1ae7795b9e0a~mv2.webp"
            },
            {
                "app_id": "625c7515-1553-471e-bc66-788d0123c341",
                "first_publish_date": "2023-07-18 10:38:46",
                "first_blocks_publish_date": "2023-07-18 10:38:47",
                "app_name": "ReConvert Upsell & Cross Sell",
                "days_to_publish": "239",
                "components_type": "back office page, code package, data component, panel, premium custom charges, studio, studio widget, webhook, widget plugin",
                "url": "https://wix.com/app-market/625c7515-1553-471e-bc66-788d0123c341/",
                "account_name": "null",
                "is_pure_blocks": "FALSE",
                "is_classic_blocks": "TRUE",
                "is_velo": "TRUE",
                "sites_installed": "12230",
                "app_icon": "https://static.wixstatic.com/media/d0220c_4b0cc7c1f13b48d3a8927af4b16c2571~mv2.webp"
            },
            {
                "app_id": "c66a497a-dd62-4bca-a3e5-294a33300653",
                "first_publish_date": "2024-02-08 8:59:30",
                "first_blocks_publish_date": "2024-02-08 8:59:31",
                "app_name": "WhatsApp Chat Button",
                "days_to_publish": "18",
                "components_type": "back office page, code package, embedded script, studio, webhook",
                "url": "https://wix.com/app-market/c66a497a-dd62-4bca-a3e5-294a33300653/",
                "account_name": "null",
                "is_pure_blocks": "FALSE",
                "is_classic_blocks": "FALSE",
                "is_velo": "TRUE",
                "sites_installed": "8538",
                "app_icon": "https://static.wixstatic.com/media/d0220c_ac88cfd1120b4f6886ca0bd6cd1dcf59~mv2.webp"
            },
            {
                "app_id": "5c047089-b4af-4395-bd58-139524a3da1d",
                "first_publish_date": "2023-07-17 9:38:36",
                "first_blocks_publish_date": "2023-07-17 9:38:37",
                "app_name": "Numbers: Show Animated Stats",
                "days_to_publish": "2",
                "components_type": "back office page, code package, panel, studio, studio widget, webhook, widget plugin",
                "url": "https://wix.com/app-market/5c047089-b4af-4395-bd58-139524a3da1d/",
                "account_name": "Certified Code",
                "is_pure_blocks": "FALSE",
                "is_classic_blocks": "TRUE",
                "is_velo": "TRUE",
                "sites_installed": "8379",
                "app_icon": "https://static.wixstatic.com/media/d0220c_8bd96ce399d74cf983ae521d28b85af3~mv2.webp"
            }
        ]
    }

    // Only observe settings attribute
    static get observedAttributes() {
        return ['settings', 'config', 'view-mode'];
    }

    connectedCallback() {
        console.log('CustomElement connected to DOM');
        this.init();
    }

    disconnectedCallback() {
        console.log('CustomElement disconnected from DOM');
        this.cleanup();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`CustomElement attribute changed: ${name} from "${oldValue}" to "${newValue}"`);

        if (name === 'settings') {
            try {
                const newSettings = JSON.parse(newValue);
                this.settings = { ...this.settings, ...newSettings };
                console.log('Updated settings:', this.settings);

                // Reinitialize if already loaded
                if (this.isLoaded) {
                    this.cleanup();
                    this.init();
                }

            } catch (error) {
                console.error('Invalid settings JSON:', error);
            }
        }
    }

    async init() {
        console.log('CustomElement init method called');
        this.setCanvasSize();
        // Create canvas container
        this.canvasContainer = document.createElement('div');
        this.canvasContainer.style.width = `${this.settings.canvasWidth}px`;
        this.canvasContainer.style.height = `${this.settings.canvasHeight}px`;
        this.canvasContainer.style.border = '1px solid #ccc';
        this.canvasContainer.style.borderRadius = '8px';
        this.canvasContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        this.canvasContainer.style.margin = '0 auto';
        this.canvasContainer.style.display = 'block';

        this.appendChild(this.canvasContainer);

        // Load data and initialize Matter.js
        await this.loadData();
        await this.loadMatter();
    }

    setCanvasSize() {
        //get size of the parent element
        const parentSize = this.parentElement.getBoundingClientRect();
        console.log('Parent:', this.parentElement);
        console.log('Parent size:', parentSize);
        this.settings.canvasWidth = parentSize.width;
        this.settings.canvasHeight = parentSize.height;
    }

    async loadData() {
        if (this.env === 'development') {
            console.log('Loading mock data');
            this.data = this.mockData;
        } else {
            try {
                const response = await fetch(this.settings.dataUrl);
                const csvText = await response.text();

                // Parse CSV to array of objects with proper handling of quoted fields
                const lines = csvText.split('\n');
                const headers = lines[0].split(',').map(h => h.trim());

                const parseCSVLine = (line) => {
                    const result = [];
                    let current = '';
                    let inQuotes = false;

                    for (let i = 0; i < line.length; i++) {
                        const char = line[i];
                        if (char === '"') {
                            inQuotes = !inQuotes;
                        } else if (char === ',' && !inQuotes) {
                            result.push(current.trim());
                            current = '';
                        } else {
                            current += char;
                        }
                    }
                    result.push(current.trim());
                    return result;
                };

                this.data = lines.slice(1).filter(line => line.trim()).map(line => {
                    const values = parseCSVLine(line);
                    const obj = {};
                    headers.forEach((header, index) => {
                        obj[header] = values[index] || '';
                    });
                    return obj;
                });

                console.log('Parsed data sample:', this.data.slice(0, 3));
                this.getMinMax();

            } catch (error) {
                console.error('Error loading data:', error);
                // Create sample data if loading fails
                this.data = [
                    { app_name: 'Sample App 1', sites_installed: '1000' },
                    { app_name: 'Sample App 2', sites_installed: '2000' },
                    { app_name: 'Sample App 3', sites_installed: '3000' }
                ];
            }
            this.getMinMax();
        }
    }

    getMinMax() {
        const sitesInstalledValues = this.data.map(item => parseInt(item.sites_installed)).filter(val => !isNaN(val));

        this.minValue = Math.min(...sitesInstalledValues);
        this.maxValue = Math.max(...sitesInstalledValues);

        console.log('Min:', this.minValue, 'Max:', this.maxValue);
    }

    async loadMatter() {
        try {
            // Dynamically load Matter.js from CDN
            if (typeof Matter === 'undefined') {
                await this.loadMatterJS();
            }

            // Verify Matter.js is properly loaded
            if (typeof Matter === 'undefined' || !Matter.Engine) {
                throw new Error('Matter.js failed to load properly');
            }

            const Engine = Matter.Engine;
            const Render = Matter.Render;
            const Runner = Matter.Runner;
            const MouseConstraint = Matter.MouseConstraint;
            const Mouse = Matter.Mouse;
            const Composite = Matter.Composite;
            const Bodies = Matter.Bodies;

            // Create engine
            this.engine = Engine.create();
            const world = this.engine.world;

            // Function to add a single square
            const addSquare = (x, y, size, data, index) => {
                try {
                    const chamferRadius = Math.ceil(size * 0.25);
                    const square = Bodies.rectangle(x, y, size, size, {
                        chamfer: { radius: chamferRadius }
                    });

                    // Store the data and index with the square
                    square.data = data;
                    square.index = index;

                    Composite.add(world, square);
                    return square;
                } catch (error) {
                    console.error('Error creating square:', error);
                    return null;
                }
            };

            // Create renderer
            this.render = Render.create({
                element: this.canvasContainer,
                engine: this.engine,
                options: {
                    width: this.settings.canvasWidth,
                    height: this.settings.canvasHeight,
                    showAngleIndicator: false,
                    wireframeBackground: 'white'
                }
            });

            Render.run(this.render);
            // this.render.canvas.style.backgroundColor = '#ffffff';
            // Create runner
            this.runner = Runner.create();
            Runner.run(this.runner, this.engine);

            // Add walls
            Composite.add(world, [
                // walls
                Bodies.rectangle(this.settings.canvasWidth / 2, 0, this.settings.canvasWidth, 50, { isStatic: true }),
                Bodies.rectangle(this.settings.canvasWidth / 2, this.settings.canvasHeight, this.settings.canvasWidth, 50, { isStatic: true }),
                Bodies.rectangle(this.settings.canvasWidth, this.settings.canvasHeight / 2, 50, this.settings.canvasHeight, { isStatic: true }),
                Bodies.rectangle(this.settings.canvasWidth / 3 * 2, this.settings.canvasHeight / 3 * 2, 25, this.settings.canvasHeight / 3 * 2, { isStatic: true }),
                Bodies.rectangle(0, this.settings.canvasHeight / 2, 50, this.settings.canvasHeight, { isStatic: true })
            ]);

            // Add squares for each data point
            if (!this.data || this.data.length === 0) {
                console.warn('No data available to create squares');
                return;
            }
            
            for (let i = 0; i < this.data.length; i++) {
                try {
                    // Check if min and max values are valid
                    let square;
                    if (this.maxValue === this.minValue) {
                        console.warn('Min and max values are the same, using default size');
                        const actualSize = this.settings.minSize;
                        square = addSquare(600, 0, actualSize, this.data[i], i);
                    } else {
                        const normalizedSize = (parseInt(this.data[i].sites_installed) - this.minValue) / (this.maxValue - this.minValue);
                        const actualSize = Math.round(this.settings.minSize + (normalizedSize * (this.settings.maxSize - this.settings.minSize)));
                        square = addSquare(600, 0, actualSize, this.data[i], i);
                    }
                    
                    if (!square) {
                        console.warn(`Failed to create square for data index ${i}`);
                    }

                    // Pause between drops
                    await new Promise(resolve => setTimeout(resolve, this.settings.dropDelay));
                } catch (error) {
                    console.error(`Error creating square for data index ${i}:`, error);
                }
            }

            // Add mouse control
            const mouse = Mouse.create(this.render.canvas);
            const mouseConstraint = MouseConstraint.create(this.engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });

            Composite.add(world, mouseConstraint);

            // Keep the mouse in sync with rendering
            this.render.mouse = mouse;

            // Add mousedown event listener to detect square clicks
            this.render.canvas.addEventListener('mousedown', (event) => {
                try {
                    const rect = this.render.canvas.getBoundingClientRect();
                    const mouseX = event.clientX - rect.left;
                    const mouseY = event.clientY - rect.top;

                    // Convert screen coordinates to world coordinates
                    const worldPos = {
                        x: mouseX / (this.render.options.pixelRatio || 1),
                        y: mouseY / (this.render.options.pixelRatio || 1)
                    };

                    // Check if any body was clicked
                    const bodies = Composite.allBodies(world);
                    for (let body of bodies) {
                        // Safely check if body has required properties
                        if (body && body.data && body.bounds && typeof body.index !== 'undefined') {
                            try {
                                if (Matter.Bounds.contains(body.bounds, worldPos)) {
                                    console.log('Clicked square data:', body.data);
                                    console.log('Clicked square index:', body.index);

                                    // Set cursor to grabbing
                                    this.render.canvas.style.cursor = 'grabbing';

                                    // Dispatch custom event with clicked data
                                    this.dispatchEvent(new CustomEvent('square-clicked', {
                                        detail: {
                                            data: body.data,
                                            index: body.index
                                        }
                                    }));
                                    break;
                                }
                            } catch (boundsError) {
                                console.warn('Error checking bounds for body:', boundsError);
                                continue;
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error in mousedown handler:', error);
                }
            });

            // Add mouseup event listener to reset cursor
            this.render.canvas.addEventListener('mouseup', (event) => {
                this.render.canvas.style.cursor = 'default';
            });

            // Add mousemove event listener to handle hover effects
            this.render.canvas.addEventListener('mousemove', (event) => {
                try {
                    const rect = this.render.canvas.getBoundingClientRect();
                    const mouseX = event.clientX - rect.left;
                    const mouseY = event.clientY - rect.top;

                    // Convert screen coordinates to world coordinates
                    const worldPos = {
                        x: mouseX / (this.render.options.pixelRatio || 1),
                        y: mouseY / (this.render.options.pixelRatio || 1)
                    };

                    // Check if mouse is over any body
                    const bodies = Composite.allBodies(world);
                    let isOverSquare = false;
                    
                    for (let body of bodies) {
                        // Safely check if body has required properties
                        if (body && body.data && body.bounds && typeof body.index !== 'undefined') {
                            try {
                                if (Matter.Bounds.contains(body.bounds, worldPos)) {
                                    isOverSquare = true;
                                    break;
                                }
                            } catch (boundsError) {
                                console.warn('Error checking bounds for body:', boundsError);
                                continue;
                            }
                        }
                    }

                    // Set cursor based on whether mouse is over a square
                    this.render.canvas.style.cursor = isOverSquare ? 'grab' : 'default';
                } catch (error) {
                    console.error('Error in mousemove handler:', error);
                }
            });

            // Fit the render viewport to the scene
            Render.lookAt(this.render, {
                min: { x: 0, y: 0 },
                max: { x: this.settings.canvasWidth, y: this.settings.canvasHeight }
            });

            this.isLoaded = true;

        } catch (error) {
            console.error('Error loading Matter.js:', error);
        }
    }

    async loadMatterJS() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Matter.js'));
            document.head.appendChild(script);
        });
    }

    cleanup() {
        if (this.render && typeof Matter !== 'undefined') {
            Matter.Render.stop(this.render);
        }
        if (this.runner && typeof Matter !== 'undefined') {
            Matter.Runner.stop(this.runner);
        }
        this.isLoaded = false;
    }

    // Public methods for external control
    reset() {
        this.cleanup();
        this.init();
    }

    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        this.reset();
    }

    getData() {
        return this.data;
    }

    getStats() {
        return {
            totalApps: this.data ? this.data.length : 0,
            minSites: this.minValue,
            maxSites: this.maxValue
        };
    }
}

customElements.define('custom-element', CustomElement);