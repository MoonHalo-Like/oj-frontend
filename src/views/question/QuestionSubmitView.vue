<template>
  <div id="QuestionSubmitView">
    <a-form :model="searchParams" layout="inline" style="min-width: 280px">
      <a-form-item field="questionId" label="题号">
        <a-input v-model="searchParams.questionId" placeholder="请输入题号" />
      </a-form-item>
      <a-form-item field="language" label="编程语言" style="min-width: 280px">
        <a-select
          v-model="searchParams.language"
          :style="{ width: '320px' }"
          placeholder="选择语言"
        >
          <a-option>java</a-option>
          <a-option>c++</a-option>
          <a-option>golang</a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">搜索</a-button>
      </a-form-item>
    </a-form>
    <!--    表格-->
    <a-divider :size="size" />
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
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <template #status="{ record }">
        <div v-if="record.status === 0">待判题</div>
        <div v-if="record.status === 1">判题中</div>
        <div v-if="record.status === 2">成功</div>
        <div v-if="record.status === 3">失败</div>
      </template>
      <template #judgeInfo="{ record }">
        程序执行信息： {{ record.judgeInfo.message }}<br />
        内存： {{ record.judgeInfo.memory }}<br />
        时间： {{ record.judgeInfo.time }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { Question, QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const size = 0;
const router = useRouter();
const show = ref(true);
const total = ref(0);
const dataList = ref([]);
const searchParams = ref({
  questionId: undefined,
  language: undefined,
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost(
    {
      ...searchParams.value,
      sortField: "createTime",
      sortOrder: "descend",
    }
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
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
    title: "提交号",
    dataIndex: "id",
  },
  {
    title: "编程语言",
    dataIndex: "language",
  },
  {
    title: "判题信息",
    slotName: "judgeInfo",
  },
  {
    title: "判题状态",
    slotName: "status",
  },
  {
    title: "题目编号",
    dataIndex: "questionId",
  },
  {
    title: "提交者",
    dataIndex: "userId",
  },
  {
    title: "提交时间",
    slotName: "createTime",
  },
];
//跳转题目做题页面
const toQuestionPage = async (question: Question) => {
  await router.push({
    path: `/write/question/${question.id}`,
  });
};
//翻页
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};
//搜索
const doSubmit = () => {
  //重置页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped>
#QuestionSubmitView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
