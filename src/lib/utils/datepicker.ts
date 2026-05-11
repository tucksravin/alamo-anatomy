import flatpickr from 'flatpickr';
import type { Options } from 'flatpickr/dist/types/options';

export function datepicker(node: HTMLInputElement, options: Options = {}) {
	const twoYearsOut = new Date();
	twoYearsOut.setFullYear(twoYearsOut.getFullYear() + 2);

	const fp = flatpickr(node, {
		dateFormat: 'Y-m-d',
		minDate: 'today',
		maxDate: twoYearsOut,
		altInput: true,
		altFormat: 'F j, Y',
		...options
	});

	return {
		update(newOptions: Options = {}) {
			Object.entries(newOptions).forEach(([key, value]) => {
				fp.set(key as keyof Options, value);
			});
		},
		destroy() {
			fp.destroy();
		}
	};
}
