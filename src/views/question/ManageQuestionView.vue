<template>
  <div id="manageQuestionView">
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag
            v-for="(tag, index) of JSON.parse(record.tags)"
            :key="index"
            color="green"
            >{{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)">修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <template #judgeConfig="{ record }">
        时间限制：{{ JSON.parse(record.judgeConfig).timeLimit }}<br />
        内存限制：{{ JSON.parse(record.judgeConfig).timeLimit }}<br />
        堆栈限制：{{ JSON.parse(record.judgeConfig).timeLimit }}
      </template>
      <template #judgeCase="{ record }">
        <div v-for="(item, index) in JSON.parse(record.judgeCase)" :key="index">
          <span style="margin-right: 10px">输入用例：{{ item.input }}</span>
          输出用例：{{ item.output }}
        </div>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { Question, QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment/moment";

const router = useRouter();
const show = ref(true);
const total = ref(0);
const dataList = ref([]);
const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    console.log(dataList.value);
    total.value = Number(res.data.total);
  } else {
    message.error("加载失败," + res.message);
  }
};

onMounted(() => {
  loadData();
});
/**
 * 监听数据，当发生改变重新加载
 */
watchEffect(() => {
  loadData();
});

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "答案",
    dataIndex: "answer",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
  },
  {
    title: "判题配置",
    slotName: "judgeConfig",
  },
  {
    title: "判题用例",
    slotName: "judgeCase",
  },
  {
    title: "用户id",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
//更新
const doUpdate = async (question: Question) => {
  await router.push({
    path: "/update/question",
    query: {
      id: question.id,
    },
  });
};
//删除
const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    // 刷新
    await loadData();
  } else {
    message.error("删除失败," + res.message);
  }
};
//翻页
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};
</script>

<style scoped>
#manageQuestionView {
}
</style>
