import type { ProfileConfig } from "@/types/config";
import { withUserConfig } from "../utils/config-overlay.ts";

/**
 * 博主资料：头像 / 名称 / 简介 / 社交链接（侧栏 Profile 卡片、页脚、RSS 作者等消费）。
 * 类型见 src/types/config.ts。
 */
export const profileConfig: ProfileConfig = withUserConfig("profile", {
	avatar: "assets/images/avatar.jpg",
	name: "Hui_xuan_biao",
	bio: "爱玩游戏，啥也不会。",
	links: [
		{
			name: "Bilibili",
			icon: "fa7-brands:bilibili",
			url: "https://space.bilibili.com/3493280090163661",
		},
		{
			name: "GitHub",
			icon: "fa7-brands:github",
			url: "https://github.com/isasho",
		},
	],
});
