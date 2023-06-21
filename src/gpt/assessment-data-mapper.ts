export class AssessmentDataMapper {
    public static map(data: any): any {
        return data.items_by_column_values.map((item: any) => {
            return {
                name: item.name,
                group: item.group.title,
                updates: item.updates.map((update) => update.body).join('\n'),
                rating: item.column_values.find((column: any) => column.id === 'm_hckthn_wwwratngg').value,
            }
        });
    }
}
