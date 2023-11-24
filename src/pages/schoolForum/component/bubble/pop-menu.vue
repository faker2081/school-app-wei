<template>
	<view class="pop-dialog" v-if="isShow" :style="'top:' + top + ';right:' + right">
		<view class="pop-dialog-triangle">
			<image class="pop-dialog-triangle-img" mode="scaleToFill" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAVRJREFUWEftlNlxhDAMhiXPJBXkLCAF5O7BFtSRblIMx9BCrm0je6QEgzJm8E6WcBhvNryYN8Dy/+kDC2HmC2fOhwAQDAQDexmI4/haa32c5/mL73H2BiCiG2ZOAeAIEVWapq8+EF4AP8Ivm9AvX4jJAEqpWwAwnV+0Ot4gIk01MQlgINyybIQQKkmSN9fP4QzgEF5nIuLamHCFcAKQUt4hotF+7tKZgdBaU1EUoyZGAaaGW0BmXgOAyvP8fQh6EMCEA0CGiGcunXesWTEzDUH0AkRRdF+WZbpHuOVZGRNZln10NdEJYMLNkGFm387bWb0QvwCI6KGZcKee2vvKlgBAbRM7AAcMt1DLZmIu7IMtwD+Ed0LUAFLKx+acn/yx9r7tPpuxvUAiuqqq6smsFELUBczc/je29+13QoidtUO1dm+bU5bl8+ggOrSRABAMBAOzG/gGSpuPHxVNZtoAAAAASUVORK5CYII="></image>
		</view>
		<view class="pop-body">
			<view v-for="(item, index) in list" v-bind:key="index" class="pop-item" @tap.stop.prevent="onTapPopMenu(item)">
				<view v-if="index>0" class="pop-line"></view>
				<view class="pop-item-contents">
					<image class="pop-img" :src="item.icon" v-if="item.icon"></image>
					<text class="pop-text">{{ item.name }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const props = defineProps({
	isShow: {
		type: Boolean,
		default: false
	},
	list: {
		type: Array,
		default: () => {
			return []
		}
	},
	top: {
		type: Number,
		default: 0
	},
	right: {
		type: Number,
	}
});

const isShow = ref(props.isShow)
const list = ref(props.list)
const top = ref(props.top)
const right = ref(props.right)


//	定义返回给父组件的方法
const emit = defineEmits(['tapMenu'])

function onTapPopMenu(item) {
	emit('tapMenu', item);
}

//	抛出子组件方法让父组件调用
defineExpose({
})
</script>

<style lang="scss" scoped>
.pop-dialog {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: center;
	z-index: 9999999;
	position: fixed;
}

.pop-dialog-triangle {
	display: flex;
	flex-direction: row-reverse;
}

.pop-dialog-triangle-img {
	width: 32rpx;
	height: 32rpx;
	position: relative;
	top: 10rpx;
	right: 32rpx;
}

.pop-body {
	background-color: #4B4B4B;
	flex: 1;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.pop-item {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.pop-item-contents {
	flex: 1;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	padding: 24rpx 32rpx;
}

.pop-img {
	width: 40rpx;
	height: 40rpx;
}

.pop-text {
	margin-left: 24rpx;
	font-size: 32rpx;
	color: #ffffff;
	position: relative;
	top: 2rpx;
}

.pop-line {
	opacity: 0.2;
	height: 0;
	border-top: 1rpx solid $u-type-info-light;
}
</style>
