import {observable, action, computed} from 'mobx';

class Store {
    @observable todos;
    @observable testLabelList = [];
    @observable testLabelAll = [];
    @observable helo = '123';

    @observable tableData = [];
    constructor() {
        // console.log(this.helo);
        this.testLabelAll = ['haha'];
        this.todos = [{
            title: 'helo',
            done: false,
        }];
    }
    @action getSubject(data) {
      this.tableData = data;
      console.log(this.tableData);
      console.log('getSubjectData');
    }
    @computed get getHelo() {
        return this.helo + 'haha';
    }
    @action setData() {
        window.setTimeout(() => {
            this.todos[0].title = 'haha';

        }, 3000);
        console.log('store', this.testLabelAll);
    }
}
const store = new Store();

export default store;