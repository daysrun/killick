// UnitManager: centralizes unit conversion logic used across the app.
// Keep this file small and focused; additional unit-related helpers can be
// added here if needed (formatting, locale-aware units, etc.).

export class UnitManager {
	/**
	 * Convert a named telemetry value into a display-friendly value + unit.
	 * Input: key (string) and value (number or other).
	 * Output: { value: displayValue, unit: string }
	 */
	static convertValue(key, value) {
		switch (key) {
			case 'Depth':
				// Depth in meters -> feet. Use '--' for sentinel large values.
				return {
                    value: value < 42000000 ? (value * 3.28084).toFixed(value > 3 ? 0 : 1) : '--',
                    unit: 'ft',
                    unitSpace: ' '
                };
			case 'AWA':
				// Apparent wind angle (radians) -> degrees, indicate side
				return {
                    value: (Math.abs(value) * (180 / Math.PI)).toFixed(0),
                    unit: `° ${value < 0 ? 'port' : 'starboard'}`,
                    unitSpace: ''
                };
			case 'AWS':
			case 'SOG':
				// Speed in m/s -> knots
                if (value === undefined || value === null || isNaN(value)) {
                    return { value: '--', unit: 'knots', unitSpace: ' ' };
                }
                const knots = value * 1.94384;
				return {
                    value: knots.toFixed(knots === 0 ? 0 : knots < 9.999 ? 1 : 0),
                    unit: 'knots',
                    unitSpace: ' '
                };
			case 'COG':
				// Course over ground in radians -> degrees True
				return {
                    value: (value * (180 / Math.PI)).toFixed(0),
                    unit: '° T',
                    unitSpace: ''
                };
			case 'Distance':
				// Meters -> nautical miles
				return {
                    value: (value * 0.000539957).toFixed(1),
                    unit: 'nm',
                    unitSpace: ' '
                };
			default:
				return { value: value, unit: '', unitSpace: '' };
		}
	}

    static convertWindAngle(angleRadians) {
        if (angleRadians === undefined || angleRadians === null || isNaN(angleRadians)) {
            return { value: 0, unit: '°', unitSpace: '' };
        }
        let angleDegrees = angleRadians * (180 / Math.PI);
        return { value: angleDegrees, unit: '°', unitSpace: '' };
    }

    static toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    static toDegrees(radians) {
        return radians * (180 / Math.PI);
    }
}

export default UnitManager;
