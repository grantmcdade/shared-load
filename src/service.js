import injector from 'vue-inject'

class MyService {
  hello () {
    console.log('Hello World!')
  }
}

injector.service('myService', MyService)
