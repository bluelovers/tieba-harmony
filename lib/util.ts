
import { array_unique } from 'array-hyper-unique';
import { arrCjk } from 'cjk-conv/lib/zh/table/list';
import zhRegExp from 'regexp-cjk';
import UString from 'uni-string';
import { star } from '../data/tieba';

export { array_unique, arrCjk }

export function splitZh(s: string)
{
	return s
		.split(/([\u4E00-\u9FFF\u{20000}-\u{2FA1F}])/u)
		.filter(v => v !== '')
	;
}

/**
 * @example console.log(arraySep(star));
 */
export function arraySep(arr: string[])
{
	let ret = arr.reduce(function (a, v)
	{
		let ls = UString.split(v, '');

		if (ls.length > 2)
		{
			let ret: string[][] = []

			splitZh(v)
				.reduce(function (a, b)
				{
					ret.push([a, b]);

					return b;
				})
			;

			a.push(...ret)
		}
		else if (ls.length)
		{
			a.push(ls)
		}

		return a
	}, []);

	ret.sort();

	return ret
}

export function arrayToRegExp<T extends string | RegExp | zhRegExp>(arr: T[], unique?: boolean)
{
	let ret = arr.map(function (v)
	{
		return zhRegExp.create(v, 'ig')
	});

	if (unique)
	{
		ret = array_unique(ret)
	}

	return ret
}