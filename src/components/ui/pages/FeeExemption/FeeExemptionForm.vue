<template>
  <div class="overlay">
    <div class="popup">
      <div class="popup__header">
        <div class="popup__label">Thêm học sinh được miễn giảm</div>
        <div class="popup--close pointer"></div>
      </div>
      <div class="popup__body">
        <div class="student__panel">
          <div class="form-group">
            <label class="required" for="">Học sinh</label>
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 10;
    display: none;

  .popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1200px;
    height: 600px;
    background-color: #fff;
    border-radius: 4px;

    .popup__header {
      padding: 12px 12px;
      display: flex;
      justify-content: space-between;

      .popup__label {
        color: #575757;
        font-weight: 500;
        font-family: OpenSans Semibold;
        font-size: 18px;
        line-height: 22px;
        padding-left: 12px;
        padding-top: 12px;
      }

      .popup--close {
        background-image: url(@/assets/Icons/ic_close_16.png);
        background-size: cover;
        background-repeat: no-repeat;
        width: 16px;
        height: 17px;
      }
    }

    .popup__body {
      padding: 24px;
      width: 100%;
      height: 100%;

      .form-group {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
