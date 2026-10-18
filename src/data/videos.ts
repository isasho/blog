/**
 * 视频页数据源（纯内容）。
 * 每条视频对应一张卡片，点击后站内弹窗播放，不跳转外链。
 *
 * 字段：
 * - id: 唯一标识；
 * - title: 标题；
 * - src: 视频文件地址（相对 /public 或绝对 URL），文件放 public/videos/；
 * - cover: 封面图（可选，相对 /public 或绝对 URL；省略 = 主题色渐变占位）；
 * - description: 一句话说明（可选）。
 */
export interface VideoItem {
	id: string;
	title: string;
	src: string;
	cover?: string;
	description?: string;
}

export const videosData: VideoItem[] = [
	{
		id: "demo",
		title: "示例视频",
		src: "/videos/demo.mp4",
	},
];
