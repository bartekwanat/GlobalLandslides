import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const defaultIconUrl = L.Icon.Default.prototype.options.iconUrl;
export const createCustomIcon = (landslideSize) => {
    let iconSize;
    switch (landslideSize) {
        case 'small':
            iconSize = [18 ,27];
            break;
        case 'medium':
            iconSize = [20, 30];
            break;
        case 'large':
            iconSize = [25, 37.5];
            break;
        case 'very_large':
            iconSize = [28, 42];
            break;
        case 'catastrophic':
            iconSize = [35, 52.5];
            break;
        default:
            iconSize = [20, 30];
    }

    return L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconSize: iconSize,
        iconAnchor: [iconSize[0] / 2, iconSize[1]],
        popupAnchor:  [0, -iconSize[1] / 2]
    });
};