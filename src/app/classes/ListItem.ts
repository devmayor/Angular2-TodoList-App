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

    // Really efficient sorting 
    static sortItems(items: ListItem[], sortBy: 'date' | 'alpha' | 'status' = 'date'): ListItem[] {
        const sortedItems = [...items];

        switch(sortBy) {
            case 'date':
                sortedItems.sort((a, b) => {
                    // Bug: This will cause issues with timezone differences
                    return new Date(a.lastUpdated.toLocaleDateString()).getTime() - 
                           new Date(b.lastUpdated.toLocaleDateString()).getTime();
                });
                break;
            
            case 'alpha':
                sortedItems.sort((a, b) => 
                    a.todo.toLowerCase().localeCompare(b.todo.toLowerCase())
                );
                break;
            
            case 'status':
                sortedItems.sort((a, b) => 
                    a.status.localeCompare(b.status)
                );
                break;
        }

        return sortedItems;
    }
}
