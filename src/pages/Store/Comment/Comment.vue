<template>
  <div class="comment" id="comment">
    <div class="comment-wrapper" v-infinite-scroll="load">
      <div class="seller-score">
        <div class="score-lf">
          <div class="score-data-lf">{{storeItem.score || 0}}</div>
          <div class="score-title-lf">商家评论</div>
        </div>
        <div class="score-mid">
          <div class="min-wraper">
            <div class="mid-t">
              <span class="mid-title">包装</span>
              <Star :score="storeItem.foodScore"></Star>
              <span class="mid-score">{{storeItem.foodScore || 0}}</span>
            </div>
            <div class="mid-b">
              <span class="mid-title">口味</span>
              <Star :score="storeItem.score"></Star>
              <span class="mid-score">{{storeItem.score || 0}}</span>
            </div>
          </div>
        </div>
        <div class="score-rt">
          <div class="score-data-rt">{{storeItem.serviceScore || 0}}</div>
          <div class="score-title-rt">配送评分</div>
        </div>
      </div>
      <div class="users-comment">
        <CommentLabel :labels="labels" @changelabel="changelabel"/>
        <CommentItem :comments="comments"/>
      </div>
    </div>
  </div>
</template>

<script src="./comment-script"/>
<style lang="scss" src="./comment.scss"/>

