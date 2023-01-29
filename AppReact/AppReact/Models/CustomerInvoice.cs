namespace AppReact.Models
{
    public partial class CustomerInvoice
    {
        public int Id { get; set; }
        public DateTime? Date { get; set; }
        public string? Status { get; set; }
        public int? Amount { get; set; }
    }
}
