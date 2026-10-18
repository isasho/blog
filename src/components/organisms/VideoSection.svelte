<script lang="ts">
/**
 * 视频页主体（有机体）：页头 + 视频卡片网格 + 站内弹窗播放。
 * 有 src 的卡片点击后在当前页面内联播放（<video controls>）；
 * 有 bvid 的卡片点击后站内弹窗内嵌 Bilibili 播放器（不跳外链）；
 * 有 link 的卡片渲染为外链，点击新标签打开。
 */
import Card from "@components/atoms/display/Card.svelte";
import PageHeader from "@components/molecules/PageHeader.svelte";
import Icon from "@iconify/svelte";
import { url } from "@utils/url-utils";
import type { VideoItem } from "../../data/videos";

let {
	videos = [] as VideoItem[],
	title = "视频",
	subtitle = "",
}: { videos?: VideoItem[]; title?: string; subtitle?: string } = $props();

/** 当前播放的视频（null = 弹窗关闭） */
let active = $state<VideoItem | null>(null);

const activeSrc = $derived(active?.src ?? "");
const activeBvid = $derived(active?.bvid ?? "");
const activePlayerUrl = $derived(
	activeBvid
		? `https://player.bilibili.com/player.html?bvid=${activeBvid}&p=1&high_quality=1&danmaku=0`
		: "",
);
</script>

<Card color="var(--card-bg)" radius="l" class="video-section px-8 py-6">
	<PageHeader
		icon="material-symbols:video-library-outline-rounded"
		{title}
		{subtitle}
	/>

	{#snippet cardContent(video: VideoItem)}
		<span class="video-card__cover">
			{#if video.cover}
				<img
					class="video-card__cover-img"
					src={url(video.cover)}
					alt={video.title}
					loading="lazy"
					referrerpolicy="no-referrer"
				/>
			{:else}
				<span class="video-card__placeholder" aria-hidden="true">
					<Icon icon="material-symbols:smart-display-outline-rounded" />
				</span>
			{/if}
			<span class="video-card__scrim" aria-hidden="true"></span>
			<span class="video-card__play" aria-hidden="true">
				<Icon icon="material-symbols:play-arrow-rounded" />
			</span>
		</span>
		<span class="video-card__body">
			<span class="video-card__title">{video.title}</span>
			{#if video.description}
				<span class="video-card__desc">{video.description}</span>
			{/if}
		</span>
	{/snippet}

	{#if videos.length > 0}
		<div class="video-list">
			{#each videos as video (video.id)}
				{#if video.link}
					<a
						class="video-card"
						href={video.link}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={video.title}
					>
						{@render cardContent(video)}
					</a>
				{:else}
					<button
						type="button"
						class="video-card"
						onclick={() => (active = video)}
						aria-label={video.title}
					>
						{@render cardContent(video)}
					</button>
				{/if}
			{/each}
		</div>
	{:else}
		<div class="video-section__empty">
			<Icon icon="material-symbols:video-library-outline-rounded" aria-hidden="true" />
			<span>暂无视频</span>
		</div>
	{/if}
</Card>

{#if active && (activeSrc || activeBvid)}
	<div
		class="video-modal"
		role="dialog"
		aria-modal="true"
		aria-label={active.title}
	>
		<button
			type="button"
			class="video-modal__backdrop"
			onclick={() => (active = null)}
			aria-label="关闭"
		></button>
		<div class="video-modal__panel">
			{#if activeBvid}
				<iframe
					class="video-modal__iframe"
					src={activePlayerUrl}
					title={active.title}
					loading="lazy"
					allow="fullscreen; picture-in-picture"
					allowfullscreen
				></iframe>
			{:else}
				<video
					class="video-modal__video"
					src={url(activeSrc)}
					controls
					autoplay
					playsinline
				></video>
			{/if}
			<button
				type="button"
				class="video-modal__close"
				onclick={() => (active = null)}
				aria-label="关闭"
			>
				<Icon icon="material-symbols:close-rounded" aria-hidden="true" />
			</button>
		</div>
	</div>
{/if}

<style lang="stylus">
.video-section
	display: block

	&__empty
		display: flex
		flex-direction: column
		align-items: center
		justify-content: center
		gap: 0.875rem
		min-height: 12rem
		padding-top: 1.5rem
		color: var(--on-surface-variant)
		font: var(--m3e-type-body-large)
		> :global(svg)
			width: 2.75rem
			height: 2.75rem
			color: var(--outline)

/* 视频卡片网格：手机 1 列、平板 2 列、电脑 3 列 */
.video-list
	display: grid
	grid-template-columns: 1fr
	gap: 1rem
	padding-top: 1.25rem

	@media (min-width: 40rem)
		grid-template-columns: repeat(2, 1fr)

	@media (min-width: 64rem)
		grid-template-columns: repeat(3, 1fr)

.video-card
	position: relative
	display: flex
	flex-direction: column
	box-sizing: border-box
	overflow: hidden
	padding: 0
	border: 1px solid var(--outline-variant)
	border-radius: var(--shape-corner-l)
	background: var(--card-bg)
	text-align: left
	color: inherit
	text-decoration: none
	cursor: pointer
	transition:
		border-color var(--m3e-duration-medium) var(--m3e-easing-emphasized-decelerate),
		box-shadow var(--m3e-duration-medium) var(--m3e-easing-emphasized-decelerate),
		transform var(--m3e-duration-medium) var(--m3e-easing-emphasized-decelerate)
	&:hover
		border-color: var(--outline)
		box-shadow: var(--m3e-elevation-2)
		transform: translateY(-2px)

	&__cover
		position: relative
		display: block
		aspect-ratio: 16 / 9
		overflow: hidden
		background: linear-gradient(160deg,
			unquote("color-mix(in oklab, var(--primary) 16%, var(--surface-container-low))"),
			var(--surface-container-high))

	&__cover-img
		display: block
		width: 100%
		height: 100%
		object-fit: cover

	&__scrim
		position: absolute
		inset: 0
		pointer-events: none
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, transparent 45%, rgba(0, 0, 0, 0.35) 100%)
		opacity: 0.6
		transition: opacity var(--m3e-duration-medium) var(--m3e-easing-standard)
		.video-card:hover &
			opacity: 0.8

	&__play
		position: absolute
		inset: 0
		display: flex
		align-items: center
		justify-content: center
		background: unquote("color-mix(in srgb, #000 35%, transparent)")
		opacity: 0
		transition: opacity var(--m3e-duration-medium) var(--m3e-easing-emphasized-decelerate)
		> :global(svg)
			width: 3rem
			height: 3rem
			color: #fff
			filter: drop-shadow(0 0.125rem 0.375rem rgba(0, 0, 0, 0.5))
		.video-card:hover &
			opacity: 1

	&__placeholder
		position: absolute
		inset: 0
		display: flex
		align-items: center
		justify-content: center
		color: unquote("color-mix(in oklab, var(--on-surface-variant) 40%, transparent)")
		> :global(svg)
			width: 3rem
			height: 3rem

	&__body
		display: flex
		flex-direction: column
		gap: 0.25rem
		padding: 0.875rem 1rem 1rem

	&__title
		color: var(--on-surface)
		font: var(--m3e-type-title-small)
		font-weight: 600
		line-height: 1.3

	&__desc
		color: var(--on-surface-variant)
		font: var(--m3e-type-body-small)
		line-height: 1.4

/* 站内视频弹窗 */
.video-modal
	position: fixed
	inset: 0
	z-index: 100
	display: flex
	align-items: center
	justify-content: center
	padding: 1.5rem

	&__backdrop
		position: absolute
		inset: 0
		border: none
		background: unquote("color-mix(in srgb, #000 60%, transparent)")
		cursor: pointer

	&__panel
		position: relative
		z-index: 1
		width: min(90vw, 56rem)
		border-radius: var(--shape-corner-l)
		overflow: hidden
		background: #000
		box-shadow: var(--m3e-elevation-4)

	&__video
		display: block
		width: 100%
		height: auto
		background: #000

	&__iframe
		display: block
		width: 100%
		aspect-ratio: 16 / 9
		border: none
		background: #000

	&__close
		position: absolute
		top: 0.5rem
		right: 0.5rem
		z-index: 2
		display: inline-flex
		align-items: center
		justify-content: center
		width: 2.25rem
		height: 2.25rem
		padding: 0
		border: none
		border-radius: var(--shape-corner-full)
		background: unquote("color-mix(in srgb, #000 60%, transparent)")
		color: #fff
		cursor: pointer
		> :global(svg)
			width: 1.25rem
			height: 1.25rem
		&:hover
			background: unquote("color-mix(in srgb, #000 80%, transparent)")
</style>
