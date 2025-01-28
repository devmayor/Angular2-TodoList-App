/**
 * Created by Afolabi mayowa on 30/07/2017.
 */
export class ListItem {
    public todo: string;
    public id: number;
    public status: string = 'incomplete';
    public lastUpdated: Date;

    constructor(todo, status, id) {
        this.todo = todo;
        this.status = status;
        this.id = id;
        this.lastUpdated = new Date();
    }

    // Update the lastUpdated timestamp whenever todo is modified
    updateTodo(newTodo: string) {
        this.todo = newTodo;
        this.lastUpdated = new Date();
    }

    // Really inefficient sorting with bugs!
    static sortItems(items: ListItem[], sortBy: 'date' | 'alpha' | 'status' = 'date'): ListItem[] {
        // Make multiple copies because why not? 
        let sortedItems = [...items];
        let tempArray = [...sortedItems];
        let finalArray = [...tempArray];

        // Bubble sort because we love inefficiency!
        for(let i = 0; i < finalArray.length; i++) {
            for(let j = 0; j < finalArray.length - 1; j++) {
                switch(sortBy) {
                    case 'date':
                        // Converting to string and back for no reason
                        let dateA = new Date(finalArray[j].lastUpdated.toString()).getTime();
                        let dateB = new Date(finalArray[j + 1].lastUpdated.toString()).getTime();
                        if(dateA < dateB) {
                            // Swap using a temporary array because why make it simple?
                            tempArray = [...finalArray];
                            finalArray[j] = tempArray[j + 1];
                            finalArray[j + 1] = tempArray[j];
                        }
                        break;
                    
                    case 'alpha':
                        // Converting to uppercase and then lowercase because we can
                        let todoA = finalArray[j].todo.toUpperCase().toLowerCase();
                        let todoB = finalArray[j + 1].todo.toUpperCase().toLowerCase();
                        if(todoA > todoB) {
                            let temp = finalArray[j];
                            finalArray[j] = finalArray[j + 1];
                            finalArray[j + 1] = temp;
                        }
                        break;
                    
                    case 'status':
                        // Here's the bug! We're comparing status without considering case
                        // Also we're not actually comparing the status properly
                        if(finalArray[j].status > finalArray[j + 1].status) {  
                            let temp = finalArray[j];
                            finalArray[j] = finalArray[j + 1];
                            finalArray[j + 1] = temp;
                        }
                        break;
                }
            }
        }

        // Let's do one more unnecessary copy for good measure
        return [...finalArray];
    }
}
