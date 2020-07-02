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
@import "@/assets/font/fontello.scss";

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

}

.wrapper{
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 2.5rem;
  overflow: hidden;
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
      margin-bottom: 5px;
    }
  }
  &__footer{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 2rem;
  }
}

.input{
  &-placeholder{
    position: relative;
    margin-bottom: 0.5rem;
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
