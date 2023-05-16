import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(categoriesFormDB: any[], selectedValue: string): any[] {

    if(!selectedValue){
      return categoriesFormDB;
    }

    return categoriesFormDB.filter(item => item.title === selectedValue);
  }

}
