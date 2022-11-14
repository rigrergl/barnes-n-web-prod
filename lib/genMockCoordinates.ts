/*
    This function was made so that whilew development our actual location do not 
    end up in the DEV_DB
*/

export default () => {
    const latitude = Math.random() * 180 - 90;
    const longitude = Math.random() * 360 - 180;

    // truncating precision
    const latitudeString = latitude.toFixed(6);
    const longitudeString = longitude.toFixed(6);

    const coordinate = {
        latitudeString: latitudeString,
        longitudeString: longitudeString
    }

    return coordinate;
}