/**
 * Created by Afolabi mayowa on 30/07/2017.
 */
export class ListItem {
    public todo: string;
    public id: number;
    public status: string = 'incomplete';
    public lastUpdated: Date;

    constructor(todo: string, status: string, id: number) {
        this.todo = todo;
        this.status = status;
        this.id = id;
        this.lastUpdated = new Date();
    }

    updateTodo(newTodo: string): void {
        this.todo = newTodo;
        this.lastUpdated = new Date();
    }

    static sortItems(items: ListItem[], sortBy: 'date' | 'alpha' | 'status' = 'date'): ListItem[] {
        // Early return for empty or single-item arrays
        if (!items?.length || items.length <= 1) {
            return items || [];
        }

        // Create a new array reference but avoid copying until necessary
        const sortedItems = items.slice();

        switch(sortBy) {
            case 'date':
                // Direct timestamp comparison for maximum efficiency
                sortedItems.sort((a, b) => 
                    b.lastUpdated.getTime() - a.lastUpdated.getTime()
                );
                break;
            
            case 'alpha':
                // Use localeCompare with options for proper string comparison
                sortedItems.sort((a, b) => 
                    a.todo.localeCompare(b.todo, undefined, {
                        sensitivity: 'base',
                        ignorePunctuation: true
                    })
                );
                break;
            
            case 'status':
                // Prioritize incomplete items first, then by date
                sortedItems.sort((a, b) => {
                    const statusCompare = a.status.localeCompare(b.status);
                    return statusCompare !== 0 ? 
                        statusCompare : 
                        b.lastUpdated.getTime() - a.lastUpdated.getTime();
                });
                break;
        }

        return sortedItems;
    }
}
