export class DateMapper {
  static format(date: Date): string {
    if (!date) return "";
    return date.toLocaleDateString("pt-BR");
  }

  static from(date: string): Date {
    if (!date) return new Date();
    if (date.split("/").length === 3) {
      const [dia, mes, ano] = date.split("/");
      return new Date(`${ano}-${mes}-${dia}`);
    }
    return new Date(date);
  }

  private static plusDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }
}
