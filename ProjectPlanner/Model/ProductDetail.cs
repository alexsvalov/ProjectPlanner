using System;
using System.Collections.Generic;

namespace ProjectPlanner.Model;

/// <summary>
/// Деталь
/// </summary>
public partial class ProductDetail
{
    /// <summary>
    /// Код
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Изделие
    /// </summary>
    public long ProductId { get; set; }

    /// <summary>
    /// Материал
    /// </summary>
    public long MaterialId { get; set; }

    /// <summary>
    /// Длина заготовки
    /// </summary>
    public int LenghtNum { get; set; }

    /// <summary>
    /// Ширина заготовки
    /// </summary>
    public int? WidthNum { get; set; }

    /// <summary>
    /// Масса заготовки
    /// </summary>
    public decimal WeightNum { get; set; }

    /// <summary>
    /// Коэффициент трудоемкости
    /// </summary>
    public decimal LabourRatioNum { get; set; }

    public bool? IsActive { get; set; }

    public virtual Material Material { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
