export class DateMapper {
  static format(date: Date): string {
    return date.toLocaleDateString("pt-BR");
  }

  static from(date: string): Date {
    if (!date) return new Date();
    if (date.split("/").length === 3) {
      const [dia, mes, ano] = date.split("/");
      const convertedDate = new Date(`${ano}-${mes}-${dia}`);
      return this.plusDays(convertedDate, 1);
    }
    const convertedDate = new Date(date);
    return this.plusDays(convertedDate, 1);
  }

  private static plusDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }
}
