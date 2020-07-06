<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">

  @import "@/scss/_bootstrap-reboot.scss";
  @import "@/scss/_breakpoint.scss";

  $color-primary: #1a73e8;
  $color-danger: #d93025;
  $color-placeholder: #999;

  button{
    padding: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    @include breakpoint-down(pl){
      min-height: 100vh;
    }
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active  {
      -webkit-box-shadow: 0 0 0 30px white inset !important;
  }     

  .container{
    margin-top: 5rem;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    @include breakpoint-down(pl){
      min-height: 100vh;
      margin-top: 0px;
      margin-left: 0px;
      margin-right: 0px;
    }
  }
  .wrapper{
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 2.5rem;
    overflow: hidden;
    position: relative;
    @include breakpoint-down(pl){
      border-radius: 0px;
      padding: 2rem;
      display: block !important;
      flex-grow: 1;
      border: none;
    }
    &__header{
      padding-bottom: 1.5rem;
      h1{
        padding-top: 0.5rem;
        font-size: 1.5rem;
        font-weight: normal;
      }
    }
    &__body{
      .notice{
        margin-top: 2rem;
        margin-bottom: 2rem;
      }
      .row{
        display: flex;
        flex-wrap: wrap;
        &.no-wrap{
          flex-wrap: nowrap;
        }
      }
    }
    &__footer{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 2rem;
    }
    &__loading{
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 5px;
      background-color: lighten($color-primary, 20);
      &:before{
        content: '';
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 5px;
        transform: translateX(-100%);
        background-color: lighten($color-primary, 5);
        animation: loading 1.2s infinite ease-in-out;
      }
      @keyframes loading {
        0%{
          transform: translateX(-100%);
        }
        100%{
          transform: translateX(200%);
        }
      }
    }
  }

  .input{
    &-placeholder{
      position: relative;
      margin-bottom: 1rem;
      label{
        position: absolute;
        pointer-events: none;
        white-space: nowrap;
        font-size: 17px;
        max-width: (calc(100% - 16px));
        padding-left: 5px;
        padding-right: 5px;
        left: 8px;
        bottom: 15px;
        text-overflow: ellipsis;
        color: $color-placeholder;
        background-color: #fff;
        transition: transform 150ms cubic-bezier(0.4,0,0.2,1);
        transform-origin: left;
      }
      input{
        padding: 13px 15px;
        border: 1px solid #ccc;
        border-radius: 5px;   
        width: 100%; 
        background-color: transparent;
        &:focus{
          border-color: $color-primary;
          ~label{
            transform: scale(.75) translateY(-32px);
            color: $color-primary;
          }
        }
        &.whithValue{
          ~label{
            transform: scale(.75) translateY(-32px);
          }
        }
        &.error{
          border-color: $color-danger;
          &:focus{
            ~label{
              color:$color-danger;
            }
          }
        }
      }

      .hint{
        padding-top: 3px;
        font-size: 14px;
        &-warn{
          color: $color-danger;
        }
      }
    }
    &--wrap{
      position: relative;
    }
  }

  .btn{
    cursor: pointer;
    background-color: transparent;
    &-text{
      color: $color-primary;
    }
    &-primary{
      background-color: $color-primary;
      color: #fff;
      border-radius: 3px;
      padding: 5px 10px;
      width: 85px;
      &:hover{
        background-color: lighten($color-primary, 10);
      }
    }
  }

  .functionNav{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 1rem;
    font-size: 0.8rem;
    @include breakpoint-down(pl){
      padding: 1rem 2rem;
    }
    a{
      color: #999;
      +a{
        margin-left: 20px;
      }
    }
  }

  a{
    color: $color-primary;
  }

  .flex-align-center{
    display: flex;
    align-items: center;
  }

</style>
