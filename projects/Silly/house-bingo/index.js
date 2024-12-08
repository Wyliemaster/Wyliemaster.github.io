import { create_grid } from "./grid.js";

const grid_size = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--num-columns').trim());

create_grid("grid-container", grid_size, grid_size);

