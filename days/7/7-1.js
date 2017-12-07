// const input = `pbga (66)
// xhth (57)
// ebii (61)
// havc (66)
// ktlj (57)
// fwft (72) -> ktlj, cntj, xhth
// qoyq (66)
// padx (45) -> pbga, havc, qoyq
// tknk (41) -> ugml, padx, fwft
// jptl (61)
// ugml (68) -> gyxo, ebii, jptl
// gyxo (61)
// cntj (57)`;

//                gyxo
//               /     
//          ugml - ebii
//        /      \     
//       |         jptl
//       |        
//       |         pbga
//      /        /
// tknk --- padx - havc
//      \        \
//       |         qoyq
//       |             
//       |         ktlj
//        \      /     
//          fwft - cntj
//               \     
//                 xhth

import path from "path";
import fs from "fs";
const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");

const rows = input.split('\n');

const tree = {};
const els = [];

rows.forEach(row => {
	const el = row.split(' ')[0];
	if (row.indexOf('-> ') > -1) {
		const children = row.split('-> ')[1].split(', ');
		children.forEach(child => {
			tree[child] = el;
		});
	}
	els.push(el);
});

els.forEach(el => {
	if (!tree[el]) {
		console.log(`NO PARENT FOR: ${el}`)
	}
});