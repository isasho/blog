/**
 * 视频页数据源（纯内容）。
 * 每条视频对应一张卡片：
 * - 有 src：点击后站内弹窗播放本地视频（<video controls>）；
 * - 有 bvid：点击后站内弹窗内嵌 Bilibili 播放器（不跳外链）；
 * - 有 link：卡片为外链，点击新标签打开。
 *
 * 字段：
 * - id: 唯一标识；
 * - title: 标题；
 * - src: 视频文件地址（相对 /public 或绝对 URL），文件放 public/videos/；
 * - bvid: Bilibili 视频 BV 号（可选，站内 iframe 播放）；
 * - link: 外部视频地址（可选，外链跳转）；
 * - cover: 封面图（可选，相对 /public 或绝对 URL；省略 = 主题色渐变占位）；
 * - description: 一句话说明（可选）。
 */
export interface VideoItem {
	id: string;
	title: string;
	src?: string;
	bvid?: string;
	link?: string;
	cover?: string;
	description?: string;
}

export const videosData: VideoItem[] = [
	{
		id: "demo",
		title: "示例视频",
		src: "/videos/demo.mp4",
	},
	{
		id: "sts2-alice",
		title: "【杀戮尖塔2mod】七色的人偶师：爱丽丝·玛格特洛伊德",
		bvid: "BV1v1dHB4E2L",
		cover: "https://i2.hdslb.com/bfs/archive/90f50fe5ed8335c99590b30810b4ddbfb28341b8.jpg",
	},
];
