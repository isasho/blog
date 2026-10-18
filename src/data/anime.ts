/**
 * 番剧收藏数据（本地数据源）。
 * 用于番剧页：src/pages/anime.astro → organisms/AnimeSection → molecules/AnimeCard。
 *
 * 添加条目：在 animeData 中追加一项即可，状态筛选 chips 与计数自动生成。
 * - cover 省略时卡片显示主题色渐变占位（补图前不破版）；
 * - link 省略时封面不可点；rating 为 0-10 个人评分；
 * - progress 是结构化追番进度，watching 状态在卡片上渲染进度条。
 * JSON 数据源（外部收藏服务拉取）见 utils/anime-data.ts 的 AnimeSource 分发。
 */

import type { AnimeIdentity } from "../types/animeConfig.ts";

/** 收藏状态（Bangumi 领域通行五态） */
export type AnimeStatus =
	| "watching"
	| "completed"
	| "planned"
	| "onHold"
	| "dropped";

export interface AnimeItem {
	title: string;
	/** 封面图地址（相对 /public 或绝对 URL）；省略 = 渐变占位 */
	cover?: string;
	/** 条目外链（Bangumi/官方站等）；省略则封面不可点 */
	link?: string;
	/** 本地视频地址（相对 /public 或绝对 URL）；存在时点击封面弹窗内联播放 */
	video?: string;
	status: AnimeStatus;
	/** 个人评分 0-10 */
	rating: number;
	/** 追番进度：已看 / 总集数（未知时可选省略） */
	progress?: { watched: number; total: number };
	/** 一句话感想 */
	description?: string;
	/** 放送年份（展示用） */
	year: string;
	/** 制作公司 */
	studio?: string;
	/** 题材标签 */
	genres: string[];
	/** 观看时间段（年-月） */
	period?: { start: string; end: string };
	/** 条目来源身份标识（可选，用于跨源去重与归档） */
	identity?: AnimeIdentity;
}

export const animeData: AnimeItem[] = [
	{
		title: "龙与虎",
		cover: "/assets/anime/toradora.jpg",
		link: "https://next.xifanacg.com/anime/1889",
		video: "/videos/demo.mp4",
		status: "completed",
		rating: 9.5,
		progress: { watched: 25, total: 25 },
		description: `樱花飞舞的四月，全新的高中二年级，新的班级……

眼神凶恶，看起来像不良少年的高须龙儿，事实上连跟别人吵架都没有吵过，是个很普通的少年。如今，他正要升上高中二年级，并幸运地跟暗恋一年的栉枝实乃梨和高一时的好友北村祐作同班。另外，高须又为了怎么样才能在新的同学中解除自己是不良少年的误解而烦恼不已，却意外地因为与被称为“掌中老虎”的逢坂大河邂逅而解开大家对他的误解。但同时知道了逢坂大河不予人知的秘密——大河暗恋着龙儿的友人北村。

有一天放学后，大河正要将情书放进北村的书包时，龙儿正好走进教室里。慌忙间，大河将情书误放进龙儿的书包中，于是她决定晚上带着木刀潜入龙儿家中将情书抢回来，没想到放进龙儿书包内的只有信封。以那一夜为契机，大河和龙儿互相结成了友情与支援对方爱情的共同战线。

由于大河一人独居，且完全不会作家事及料理，因此龙儿与大河便常常一起在龙儿家同龙儿母亲吃晚餐、一起上学、一起去超市买料理材料。因为这件事情，他们两人被实乃梨与北村误解正在交往了……`,
		year: "2008",
		studio: "J.C.STAFF",
		genres: ["恋爱", "校园", "喜剧"],
		period: { start: "2008-10", end: "2009-03" },
	},
];
