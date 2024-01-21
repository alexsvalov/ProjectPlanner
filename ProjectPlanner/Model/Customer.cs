using System;
using System.Collections.Generic;

namespace ProjectPlanner.Model;

/// <summary>
/// Заказчик
/// </summary>
public partial class Customer
{
    /// <summary>
    /// Код
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// ИНН заказчика
    /// </summary>
    public string InnStr { get; set; } = null!;

    /// <summary>
    /// Краткое наименование заказчика
    /// </summary>
    public string Name { get; set; } = null!;

    /// <summary>
    /// Адрес заказчика
    /// </summary>
    public string AddressStr { get; set; } = null!;

    public bool? IsActive { get; set; }

    public virtual ICollection<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>();
}
